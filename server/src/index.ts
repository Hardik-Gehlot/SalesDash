import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes/index';
import { config } from './config/config';



//? data imports for importing data into database
// import User from './models/User';
// import Product from './models/Product';
// import ProductStat from './models/ProductStat';
// import Transaction from './models/Transaction';
// import { dataUser, dataProduct, dataProductStat, dataTransaction } from './data';

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

            //Inserting data to database
            // User.insertMany(dataUser);
            // Product.insertMany(dataProduct);
            // ProductStat.insertMany(dataProductStat);
            // Transaction.insertMany(dataTransaction).then(()=>{
            //     console.log("💥 Transactions inserted successfully");
            // }).catch(e=> console.log("❌ error"));
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
