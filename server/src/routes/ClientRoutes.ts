import express,{Request,Response,NextFunction,Router} from 'express';
import {getProducts} from '../controllers/Client';
const clientRoutes:Router = express.Router();

clientRoutes.get('/products',getProducts);

export default clientRoutes;
