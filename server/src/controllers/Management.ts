import User from "../models/User";
import Transaction from "../models/Transaction";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
export const getAdmins = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.find({ role: 'admin' }).select('-password');
        res.status(200).json(user);
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(404).json({ message: err.message })
        }
    }
}
export const getUserPerformance = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const userWithStats = await User.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id) } },
            {
                $lookup: {
                    from: "affiliatestats",
                    localField: "_id",
                    foreignField: "userId",
                    as: "affiliateStats",
                },
            },
            { $unwind: "$affiliateStats" },
        ]);

        const saleTransactions = await Promise.all(
            userWithStats[0].affiliateStats.affiliateSales.map((id: string) => {
                return Transaction.findById(id);
            })
        );
        const filteredSaleTransactions = saleTransactions.filter(
            (transaction) => transaction !== null
        );

        res
            .status(200)
            .json({ user: userWithStats[0], sales: filteredSaleTransactions });
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(404).json({ message: err.message })
        }
    }
}