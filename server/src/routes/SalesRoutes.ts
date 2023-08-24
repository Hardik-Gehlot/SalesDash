import { getSales } from '../controllers/Sales';
import express,{Router} from 'express';

const salesRoutes:Router = express.Router();

salesRoutes.get('/sales',getSales);

export default salesRoutes;
