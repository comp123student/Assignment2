import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import productRoutes from './routes/product.routes.js';
import {removeAllProducts} from './controllers/product.controller.js'; 
import categoryRoutes from './routes/category.routes.js';

const app = express(); // Create the Express app instance

// Apply middleware to the app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

// Define routes
app.use('/', productRoutes);
app.use('/', categoryRoutes);

export default app;
