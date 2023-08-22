import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        price: {
            type: Number,
            require: true
        },
        description: String,
        category: String,
        rating: Number,
        supply: Number
    }, { timestamps: true }
);
const Product = mongoose.model('Product', ProductSchema);
export default Product;