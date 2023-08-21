import express,{Request,Response,NextFunction,Router} from 'express';

const salesRoutes:Router = express.Router();

salesRoutes.get('/', (req:Request, res:Response, next:NextFunction) => {
  res.send('<h1>Sales Route 👨</h1>');
});

export default salesRoutes;
