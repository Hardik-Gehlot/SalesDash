import express,{Router} from 'express';
import {getAdmins} from '../controllers/Management'
const managementRoutes:Router = express.Router();

managementRoutes.get('/admins',getAdmins);

export default managementRoutes;
