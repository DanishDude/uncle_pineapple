const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const recipeSchema = new Schema(
    {
        title: { type: String },
        description: { type: String },
        method: { type: String },
        photo: { type: String, default: undefined },
        ingredients: [
            {
                name: { type: String },
                qty: { type: Number },
                unit: { type: String, enum: ['g', 'l', 'ml', 'tsp', 'tbs', ''] }, // TODO
            },
        ],
        servings: { type: Number },
        tags: [{ type: String }],
        status: { type: String, enum: ['draft', 'published', 'flagged', 'inappropriate'], default: 'draft' },
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        likes: { type: Number, default: 0, min: 0 },
    },
    { timestamps: { createdAt: 'createdAt' } }
);

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
