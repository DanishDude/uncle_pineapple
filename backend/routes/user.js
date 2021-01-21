const { Router } = require('express');
const router = Router();

const userService = require('../services/user');
const validate = require('../services/validate');

router.get('/validate-email', async (req, res, next) => {
    try {
        const { email } = req.body;

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
