import User from "../models/User";
import { Request, Response, NextFunction } from "express";
export const getUser = async(req:Request ,res:Response, next:NextFunction)=>{
    try{
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    }catch(err: unknown){
        if(err instanceof Error){
            res.status(404).json({ message: err.message })
        }
    }
}