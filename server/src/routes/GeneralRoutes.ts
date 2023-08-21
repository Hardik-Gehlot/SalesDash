import express,{Request,Response,NextFunction,Router} from 'express';

const generalRoutes:Router = express.Router();

generalRoutes.get('/', (req:Request, res:Response, next:NextFunction) => {
  res.send('<h1>General Route 👨</h1>');
});
export default generalRoutes;
