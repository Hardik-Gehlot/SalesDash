import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes/index';
import { config } from './config/config';



//? data imports for importing data into database
import User from './models/User';
import Product from './models/Product';
import ProductStat from './models/ProductStat';
import { dataUser, dataProduct, dataProductStat } from './data';

//! configuration
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//! Routes
app.use('/api', routes);

//!MONGO Connection
mongoose.Promise = Promise;
mongoose.connect(config.mongo.url)
    .then(() => {
        app.listen(config.server.port, () => {
            console.log("🚀 server listening on port:➡", config.server.port);
            // User.insertMany(dataUser); Inserting data into database
            // Product.insertMany(dataProduct).then(()=>{
            //     console.log("💥 Products inserted successfully");
            // }).catch(e=> console.log("❌ error"));
            // ProductStat.insertMany(dataProductStat).then(()=>{
            //     console.log("💥 ProductsStat inserted successfully");
            // }).catch(e=> console.log("❌ error"));
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
