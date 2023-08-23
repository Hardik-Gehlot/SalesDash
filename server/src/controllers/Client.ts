import ProductStat from "../models/ProductStat";
import Product from "../models/Product";
import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import Transaction from "../models/Transaction";
import getCountryIso3, { getCountryISO3 } from "ts-country-iso-2-to-3";
//! Controllers
export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products: ProductType[] = await Product.find();
        const productsWithStat = await Promise.all(
            products.map(async (product) => {
                const stat = await ProductStat.find({
                    productId: product._id
                })
                return {
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
        const customers = await User.find({ role: 'user' }).select('-password');
        res.status(200).json(customers);
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(404).json({ message: err.message })
        }
    }
}
export const getTransactions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query: Query = req.query;
        const sortFormatted:any = generateSort(query.sort as string || '');
        const page = query.page !== undefined ? +query.page : 0;
        const pageSize = query.pageSize !== undefined ? +query.pageSize : 25;
        const transactions = await Transaction.find({
            $or: [
                { cost: { $regex: new RegExp(query.search as string, 'i') } },
                { userId: { $regex: new RegExp(query.search as string, 'i') } },
            ]
        }).sort(sortFormatted)
        .skip((page * pageSize))
        .limit(pageSize);
        
        const total = await Transaction.countDocuments({
            $or:[
                {cost: { $regex: query.search, $options: 'i'}},
                {userId: { $regex: query.search, $options: 'i'}}
            ]
        });
        res.status(200).json({transactions,total,});
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(404).json({ message: err.message })
        }
    }
}
export const getGeography = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.find();
        const mappedLocations = user.reduce((acc: {[key:string]:number}, {country})=>{
            const countryISO3 = getCountryISO3(country as string);
            if(!acc[countryISO3]) acc[countryISO3]=1;
            acc[countryISO3]++;
            return acc;
        },{})
        const formattedLocations = Object.entries(mappedLocations).map(
            ([country,count])=>{
                return {id: country, value: count}
            }
        )
        res.status(200).json(formattedLocations)
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(404).json({ message: err.message })
        }
    }
}





//!Utils
function generateSort(sort: string):ISortFormat {
    if(sort === '') return {};
    const sortParsed = JSON.parse(sort);
    const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort === 'asc' ? 1 : -1),
    };
    return sortFormatted;
}
interface ISortFormat{
    [key: string]: number;
}
interface ProductType {
    _id?: string,
    _doc?: {}
}
interface Query {
    page?: number;
    pageSize?: number;
    sort?: string;
    search?: string;
}