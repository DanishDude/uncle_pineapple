const { Router } = require('express');
const router = Router();

const passportManager = require('../services/passport');
const uploadFile = require('../services/upload');
const userService = require('../services/user');
const validate = require('../services/validate');

router
    .route('/')
    .get(passportManager.authenticate, async (req, res, next) => {
        try {
            if (!req.user) {
                res.status(403).send({ success: false, msg: 'not allowed. Verify token' });
            }

            const user = await userService.getOneById(req.user._id);
            if (typeof user === 'string') {
                return res.status(400).send({ sucess: false, msg: user });
            } else {
                return res.status(200).send({
                    success: true,
                    msg: `found user ${user._id}`,
                    user,
                });
            }
        } catch (err) {
            next(err);
        }
    })
    .put(passportManager.authenticate, uploadFile.avatar, async (req, res, next) => {
        try {
            if (req.file) {
                req.body.avatar = req.file.path;
            }

            const newUser = await userService.modifyOne(req.body, req.user._id);
            if (typeof newUser === 'string') {
                return res.status(401).send({ success: false, msg: newUser });
            } else {
                return res.status(200).send({
                    success: true,
                    msg: 'user updated',
                    user: newUser,
                });
            }
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

router.get('/:email', async (req, res, next) => {
    try {
        const { email } = req.params;

        if (!email || !validate.emailFormat(email)) {
            return res.status(401).send({ success: false, msg: 'Please provide a valid email' });
        } else {
            const user = await userService.getOneByEmail(email);
            if (typeof user === 'string') {
                return res.status(200).send({ success: true, msg: 'email not registered', isRegistered: false });
            } else {
                return res.status(200).send({ success: true, msg: 'email is registered', isRegistered: true });
            }
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;
