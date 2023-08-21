import dotenv from 'dotenv';
dotenv.config();

const MONGO_URL:string = process.env.MONGO_URL ? process.env.MONGO_URL : "";
const PORT:number = process.env.PORT ? Number(process.env.PORT) : 1337;
 export const config = {
    mongo: {
      url: MONGO_URL
    },
    server: {
      port: PORT
    }
  };
  