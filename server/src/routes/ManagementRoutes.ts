import express,{Router} from 'express';
import {getAdmins,getUserPerformance} from '../controllers/Management'
const managementRoutes:Router = express.Router();

managementRoutes.get('/admins',getAdmins);
managementRoutes.get("/performance/:id", getUserPerformance);

export default managementRoutes;
