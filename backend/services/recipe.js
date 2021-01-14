const mongoose = require('mongoose');
const { handleError } = require('./error');
const user = require('./user');
const validate = require('./validate');
const Recipe = require('../models/recipe');

class RecipeService {
    constructor() {
        this.toParse = ['ingredients', 'tags'];
    }

    async createOne(data) {
        for (const [key, value] of Object.entries(data)) {
            if (this.toParse.includes(key)) {
                data[key] = JSON.parse(value);
            } else {
                data[key] = value;
            }
        }
        const recipe = new Recipe(data);
        recipe.save((err) => {
            if (err) {
                console.log(err);
            }
        });

        return recipe;
    }

    async getOneById(_id) {
        const recipe = await Recipe.findById(_id, (err, recipe) => {
            if (err) {
                console.error(err);
                return 'no recipe';
            } else {
                return recipe;
            }
        });

        return recipe;
    }

    async getAllByUserId(userId) {
        const recipe = await Recipe.find({ userId }, (err) => {
            if (err) {
                console.error(err);
            }
        });

        return recipe;
    }

    async modifyOne(recipe, data) {
        for (const [key, value] of Object.entries(data)) {
            if (this.toParse.includes(key)) {
                data[key] = JSON.parse(value);
            } else {
                data[key] = value;
            }
        }
        return await Recipe.findOneAndUpdate({ _id: recipe._id }, data, {}, (err, res) => {
            if (err) {
                console.error(err);
            }
            return res;
        });
    }

    async deleteOne(_id) {
        return await Recipe.findByIdAndDelete(_id);
    }

    async search(query) {
        const acceptableQueries = ['title', 'tag', 'ingredients', 'ids'];
        let badQuery = true;
        for (let key of Object.keys(query)) {
            if (acceptableQueries.includes(key.toLowerCase())) {
                badQuery = false;
            }
        }

        if (badQuery) {
            return `Bad query. Acceptable query items are: [${acceptableQueries}]`;
        }

        const regexTitle = new RegExp(validate.escapeRegex(query.title), 'gi');
        const regexTag = new RegExp(validate.escapeRegex(query.tag), 'gi');
        const regexIngredients = new RegExp(validate.escapeRegex(query.ingredients), 'gi');

        return await Recipe.find(
            {
                $and: [
                    query.title ? { title: regexTitle } : {},
                    query.tag ? { city: regexTag } : {},
                    query.ingredients ? { $in: { ingredients: regexIngredients } } : {},
                    query.ids ? { _id: { $in: query.ids.split(',').map((id) => mongoose.Types.ObjectId(id)) } } : {},
                ],
            },
            (err) => {
                if (err) {
                    console.error(err);
                }
            }
        );
    }

    async like(recipe) {
        recipe.likes = recipe.likes + 1;
        return await recipe.save();
    }

    async dislike(recipe) {
        if (recipe.likes > 0) {
            recipe.likes = recipe.likes - 1;
        }
        return await recipe.save();
    }
}

module.exports = new RecipeService();
