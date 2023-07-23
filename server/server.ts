import express, { Application, Response, Request, NextFunction } from "express";

// 필요한 모듈 import
import chat from "./chat/socket";
import loader from "./loaders/loader";
import router from "./loaders/express";

const initializePort = (app : Application) => {
    const HTTP_PORT = (process.env.NODE_ENV === "development") ? process.env.HTTP_LOCAL_SERVER_PORT : process.env.HTTP_AWS_SERVER_PORT;
    return app.listen(HTTP_PORT, () => console.log(`App is listening on port ${HTTP_PORT} !`));    
}

const startServer = async () => {
    const app = express();

    loader.init(app);

    await router.handle(app);
    
    const server = initializePort(app)
    
    chat(server)
}

startServer();
