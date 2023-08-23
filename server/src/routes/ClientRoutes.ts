import express,{Request,Response,NextFunction,Router} from 'express';
import {getProducts,getCustomers,getTransactions,getGeography} from '../controllers/Client';
const clientRoutes:Router = express.Router();

clientRoutes.get('/products',getProducts);
clientRoutes.get('/customers',getCustomers);
clientRoutes.get('/transactions',getTransactions);
clientRoutes.get('/geography',getGeography);

export default clientRoutes;
