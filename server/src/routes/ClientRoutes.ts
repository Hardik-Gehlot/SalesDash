import express,{Request,Response,NextFunction,Router} from 'express';
import {getProducts,getCustomers} from '../controllers/Client';
const clientRoutes:Router = express.Router();

clientRoutes.get('/products',getProducts);
clientRoutes.get('/customers',getCustomers);

export default clientRoutes;
