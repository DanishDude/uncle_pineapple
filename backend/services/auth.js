const jwt = require('jsonwebtoken');
const User = require('../models/user');

function createToken(user) {
    const { _id, email } = user;
    return jwt.sign({ _id, email }, process.env.PRIVATE_KEY /* , { expiresIn: ' 30m' } */);
}

function createPublicUser(user) {
    const { _id, email, likes } = user;
    return { _id, email, likes };
}

class Auth {
    signup(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            res.json({ success: false, msg: 'Please pass email and password' });
        } else {
            const newUser = new User({ email, password });

            newUser.save(async (err, user) => {
                if (err) {
                    if (err.errmsg && err.errmsg.includes('duplicate key'))
                        return await res.status(401).json({ success: false, msg: 'Email already exists.' });

                    if (err)
                        return await res.status(400).json({
                            success: false,
                            msg: 'Check email and password are correct',
                        });
                }

                return await res.status(201).json({
                    success: true,
                    msg: 'New user created',
                    user: createPublicUser(user),
                    token: 'JWT ' + createToken(user),
                });
            });
        }
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
                        res.status(401).send({ success: false, msg: 'Email and/or password are incorrect' });
                    }
                });
            }
        }).select(['email', 'password', 'likes']);
    }
}

module.exports = new Auth();
