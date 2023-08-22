import express,{Request,Response,NextFunction,Router} from 'express';
import { getUser } from "../controllers/General";

const generalRoutes:Router = express.Router();

generalRoutes.get('/user/:id', getUser);
export default generalRoutes;
