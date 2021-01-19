const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const userSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            lowercase: true,
            required: true,
            match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'is invalid'],
        },
        password: { type: String, select: false },
        firstname: { type: String },
        lastname: { type: String },
        likes: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
    },
    { timestamps: { createdAt: 'created_at' } }
);

userSchema.pre('save', function (next) {
    const user = this;

    if (user.isModified('password') || (user.isNew && user.password)) {
        bcrypt.hash(user.password, 10, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    } else {
        return next();
    }
});

userSchema.methods.comparePassword = function (pw, cb) {
    bcrypt.compare(pw, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
