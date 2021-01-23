const jwt = require('jsonwebtoken');
const User = require('../models/user');
const validate = require('../services/validate');

function createToken(user) {
    const { _id, email, firstname, lastname, likes } = user;
    return jwt.sign({ _id, email, firstname, lastname, likes }, process.env.PRIVATE_KEY /* , { expiresIn: ' 30m' } */);
}

function createPublicUser(user) {
    const { _id, email, firstname, lastname, likes } = user;
    return { _id, email, firstname, lastname, likes };
}

class Auth {
    async signup(req, res) {
        const { email, password } = req.body;

        if (!email || !validate.emailFormat(email)) {
            return res.status(401).send({ success: false, msg: 'Please provide a valid email' });
        } else if (!password) {
            return res.status(401).send({ success: false, msg: 'Please provide a password' });
        }

        const newUser = new User(req.body);
        newUser.save(async (err, user) => {
            if (err) {
                if (err?.errmsg?.includes('duplicate key') && err?.keyPattern?.email) {
                    return await res.status(401).json({ success: false, msg: 'Email already exists.' });
                }
                return await res.status(400).json({ success: false, msg: err });
            }

            return await res.status(201).json({
                success: true,
                msg: 'New user created',
                user: createPublicUser(user),
                token: 'JWT ' + createToken(user),
            });
        });
    }

    login(req, res, next) {
        const { email, password } = req.body;

        User.findOne({ email }, (err, user) => {
            if (err) next(err);

            if (!user) {
                res.status(401).send({ success: false, msg: 'User not found' });
            } else {
                user.comparePassword(password, (err, isMatch) => {
                    if (isMatch && !err) {
                        res.status(201).json({
                            success: true,
                            msg: 'User login',
                            user: createPublicUser(user),
                            token: 'JWT ' + createToken(user),
                        });
                    } else {
                        res.status(401).send({ success: false, msg: 'Wrong password' });
                    }
                });
            }
        }).select(['email', 'password', 'firstname', 'lastname', 'likes']);
    }
}

module.exports = new Auth();
