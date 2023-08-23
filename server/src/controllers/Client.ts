import ProductStat from "../models/ProductStat";
import Product from "../models/Product";
import { Request, Response, NextFunction } from "express";
import User from "../models/User";

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products:ProductType[] = await Product.find();
        const productsWithStat = await Promise.all(
            products.map(async (product) => {
                const stat = await ProductStat.find({
                    productId: product._id
                })
                return{
                    ...product._doc,
                    stat
                }
            })
        )
        res.status(200).json(productsWithStat)
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(404).json({ message: err.message })
        }
    }
}
export const getCustomers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customers = await User.find({ role: 'user'}).select('-password');
        res.status(200).json(customers);
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(404).json({ message: err.message })
        }
    }
}

interface ProductType{
    _id?: string,
    _doc?:{}
}