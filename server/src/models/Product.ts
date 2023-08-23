import mongoose from "mongoose";

interface IProduct{
    name: string;
    price: number;
    description: string;
    category: string;
    rating: number;
    supply: number;
}
const ProductSchema = new mongoose.Schema<IProduct>(
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
const Product = mongoose.model<IProduct>('Product', ProductSchema);
export default Product;