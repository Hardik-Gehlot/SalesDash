import express,{Request,Response,NextFunction,Router} from 'express';

const managementRoutes:Router = express.Router();

managementRoutes.get('/', (req:Request, res:Response, next:NextFunction) => {
  res.send('<h1>Management Route 👨</h1>');
});

export default managementRoutes;
