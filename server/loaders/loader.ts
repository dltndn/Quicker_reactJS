import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import express, { Application } from "express";

import { insertAverageCostPerMonth } from "./middlewares/cron-job";
import { logger } from "./middlewares/morgan-config";

const loader = {
  init : (app: Application) => {

    insertAverageCostPerMonth
    
    app.use(logger())
    app.use(compression());
    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(bodyParser.json());
  
    return app;
  }

} 

export default loader