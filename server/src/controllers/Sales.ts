import OverallStat from "../models/OverallStat";
import User from "../models/OverallStat";
import { Request, Response, NextFunction } from "express";
export const getSales = async(req:Request ,res:Response, next:NextFunction)=>{
    try{
        const overallStats = await OverallStat.find();
        res.status(200).json(overallStats[0]);
    }catch(err: unknown){
        if(err instanceof Error){
            res.status(404).json({ message: err.message })
        }
    }
}