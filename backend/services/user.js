const User = require('../models/user');

class UserClass {
    async getOneByEmail(email) {
        const user = await User.findOne({ email });

        if (user) {
            return user;
        } else {
            return `user not found with email ${email}`;
        }
    }

    async likeRecipe(user, recipe) {
        const alreadyLiked = user.likes.includes(recipe._id.toString());

        if (alreadyLiked) {
            user.likes = user.likes.filter((likeId) => likeId.toString() != recipe._id.toString());
        } else {
            user.likes.push(recipe._id);
        }

        await user.save();
        return { ...alreadyLiked };
    }
}

module.exports = new UserClass();
