const { Router } = require('express');
const router = Router();

const passportManager = require('../services/passport');
const recipeService = require('../services/recipe');
const uploadFile = require('../services/upload');
const user = require('../services/user');

router
    .route('/')
    .post(passportManager.authenticate, uploadFile.photo, async (req, res, next) => {
        try {
            const { _id } = req.user;

            if (req.file) {
                req.body.photo = req.file.path;
            }

            const newRecipe = await recipeService.createOne({ ...req.body, user: _id });

            return res.status(200).send({
                success: true,
                msg: 'New recipe created',
                newRecipe,
            });
        } catch (err) {
            next(err);
        }
    })
    .get(passportManager.authenticate, async (req, res, next) => {
        try {
            const { _id } = req.user;

            if (!_id)
                return res.status(403).send({
                    success: false,
                    msg: `not allowed`,
                });

            const recipes = await recipeService.getAllByUserId(_id);

            return res.status(200).send({
                success: true,
                msg: `Recipes by user ${_id}`,
                recipes,
            });
        } catch (err) {
            next(err);
        }
    });

router.get('/recipe', async (req, res, next) => {
    try {
        const { title, ingredients } = req.query;

        if (title || ingredients) {
            const recipes = await recipeService.search(title || null, ingredients || null);

            res.status(200).send(recipes);
        } else {
            res.status(400).send('no query sent for "name" or "city"');
        }
    } catch (err) {
        next(err);
    }
});

router.get('/search', async (req, res, next) => {
    try {
        const recipes = await recipeService.search(req.query);

        if (!recipes.length || typeof recipes === 'string') {
            res.status(200).send({
                success: true,
                msg: 'No recipes found for this query',
                recipes: [],
                query: req.query,
            });
        } else {
            res.status(200).send({
                success: true,
                msg: `recipes found: ${recipes.length}`,
                recipes,
            });
        }
    } catch (err) {
        next(err);
    }
});

router
    .route('/:recipeId')
    .get(async (req, res, next) => {
        try {
            const { recipeId } = req.params;
            const recipe = await recipeService.getOneById(recipeId);

            if (!recipe) {
                return res.status(400).send({
                    success: false,
                    msg: `Recipe not found with _id ${recipeId}`,
                });
            } else {
                return res.status(200).send({
                    success: true,
                    msg: `Recipe with id ${recipeId}`,
                    recipe,
                });
            }
        } catch (err) {
            next(err);
        }
    })
    .put(passportManager.authenticate, uploadFile.photo, async (req, res, next) => {
        try {
            const { _id } = req.user;
            const { recipeId } = req.params;
            const recipe = await recipeService.getOneById(recipeId);

            if (!recipe) {
                return res.status(400).send({
                    success: false,
                    msg: `Recipe not found with _id ${recipeId}`,
                });
            } else if (_id.toString() !== recipe.user.toString()) {
                return res.status(400).send({
                    success: false,
                    msg: `User ${_id} is not the owner of recipe ${recipeId}`,
                });
            } else {
                if (req.file) {
                    req.body.photo = req.file.path;

                    if (recipe.photo) {
                        uploadFile.deleteCloudinaryResource(recipe.photo);
                    }
                }

                const modifiedRecipe = await recipeService.modifyOne(recipe, req.body);
                return res.status(200).send({
                    success: true,
                    msg: `Modified recipe with _id ${modifiedRecipe['_doc']._id}`,
                    recipe: modifiedRecipe['_doc'],
                });
            }
        } catch (err) {
            next(err);
        }
    })
    .delete(passportManager.authenticate, async (req, res, next) => {
        try {
            const { recipeId } = req.params;
            const { _id } = req.user;
            const recipe = await recipeService.getOneById(recipeId);

            if (!recipe) {
                return res.status(400).send({
                    success: false,
                    msg: `Recipe not found with _id ${recipeId}`,
                });
            } else {
                if (recipe.photo) {
                    uploadFile.deleteCloudinaryResource(recipe.photo);
                }

                const result = await recipeService.deleteOne(recipeId);
                res.status(200).send({
                    success: true,
                    msg: `Deleted recipe with _id ${recipeId}`,
                    recipe: result,
                });
            }
        } catch (err) {
            next(err);
        }
    });

router.patch('/:recipeId/like', passportManager.authenticate, async (req, res, next) => {
    try {
        const { recipeId } = req.params;
        let recipe = await recipeService.getOneById(recipeId);
        if (!recipe) {
            res.status(400).send({ success: false, msg: `Recipe ${recipeId} not found` });
        }

        const result = await user.likeRecipe(req.user, recipe);

        if (result?.liked) {
            recipe = await recipeService.dislike(recipe);
        } else {
            recipe = await recipeService.like(recipe);
        }

        res.status(200).send({
            success: true,
            msg: `${result.liked ? 'disliked' : 'liked'} recipe ${recipeId}`,
            liked: !result.liked,
            recipe,
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
