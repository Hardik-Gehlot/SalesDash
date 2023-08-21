import express,{Request,Response,NextFunction,Router} from 'express';

const clientRoutes:Router = express.Router();

clientRoutes.get('/', (req:Request, res:Response, next:NextFunction) => {
  res.send('<h1>Client Route 👨</h1>'); 
});

export default clientRoutes;
