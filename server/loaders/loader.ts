import compression from "compression";
import express, { Application } from "express";
import morgan from "morgan";

const loader = {
    init : (app : Application) => {        
        const cors = require("cors");
        const bodyParser = require("body-parser");
    
        app.use(morgan('combined'))
        app.use(compression())
        app.use(cors());
        app.use(express.urlencoded({extended: true}))
        app.use(bodyParser.json());
    
        return app;
    },
} 

export default loader