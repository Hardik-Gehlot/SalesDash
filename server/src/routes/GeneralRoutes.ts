import express,{Router} from 'express';
import { getUser,getDashboardStats } from "../controllers/General";

const generalRoutes:Router = express.Router();

generalRoutes.get('/user/:id', getUser);
generalRoutes.get("/dashboard", getDashboardStats);
export default generalRoutes;
