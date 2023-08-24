import User from "../models/User";
import { Request, Response, NextFunction } from "express";
export const getAdmins = async(req:Request ,res:Response, next:NextFunction)=>{
    try{
        const user = await User.find({role: 'admin'}).select('-password');
        res.status(200).json(user);
    }catch(err: unknown){
        if(err instanceof Error){
            res.status(404).json({ message: err.message })
        }
    }
}