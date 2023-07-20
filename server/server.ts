import express, { Application } from "express";

// 필요한 모듈 import
import chat from "./chat/socket";
import loader from "./loaders/loader";
import router from "./loaders/express";

// Klaytn caver
import KlaytnCaver from "./klaytnApi/KlaytnCaver";
// 클립 지갑용 임시
import tempKlipConnect from "./Maria/Connectors/tempKlipConnect";

const startServer = async () => {
    const app: Application = express();

    loader.init(app);

    await router.handle(app);

    app.post("/connectKlip", tempKlipConnect.getRequests)
    
    // 클레이튼 api 연결
    app.post("/getAllowance", KlaytnCaver.getAllowance)
    app.post("/getQkrwBalance", KlaytnCaver.getQkrwBal)
    app.post("/getOrderList", KlaytnCaver.getOrderList)
    
    const HTTP_PORT = (process.env.NODE_ENV === "development") ? process.env.HTTP_LOCAL_SERVER_PORT : process.env.HTTP_AWS_SERVER_PORT;
    const server = app.listen(HTTP_PORT, () => console.log(`App is listening on port ${HTTP_PORT} !`));    
    chat(server)
}

startServer();