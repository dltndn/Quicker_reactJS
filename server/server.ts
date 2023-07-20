import express, { Application } from "express";

// 필요한 모듈 import
import chat from "./chat/socket";
import loader from "./loaders/loader";

import AssociateOrder from "./routes/AssociateOrder";
import CurrentLocation from "./routes/CurrentLocation";
import Home from "./routes/Home";
import Order from "./routes/Order";
import Orders from "./routes/Orders";
import Register from "./routes/Register";
import Room from "./routes/Room";
import User from "./routes/User";

// Klaytn caver
import KlaytnCaver from "./klaytnApi/KlaytnCaver";
// 클립 지갑용 임시
import tempKlipConnect from "./Maria/Connectors/tempKlipConnect";

const startServer = () => {
    const app: Application = express();

    loader.init(app);

    // 개발용 라우터
    app.use("/", Home);
    app.use("/AssociateOrder",AssociateOrder);
    
    // 서비스용 라우터
    app.use("/room", Room)
    app.use("/user", User)
    app.use("/order", Order)
    app.use("/orders", Orders);
    app.use("/register", Register);
    
    /**
     * @TODO : 안드로이드 라우터 코드 수정
     */ 
    app.use("/current-deliver-location", CurrentLocation);
    
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