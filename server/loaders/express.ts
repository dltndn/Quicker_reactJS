import { Application } from "express";

import AssociateOrder from "../routes/AssociateOrder";
import CurrentLocation from "../routes/CurrentLocation";
import Home from "../routes/Home";
import Order from "../routes/Order";
import Orders from "../routes/Orders";
import Register from "../routes/Register";
import Room from "../routes/Room";
import User from "../routes/User";

const router = {
  handle: async (app: Application) => {
    // 개발용 라우터
    app.use("/", Home);
    app.use("/AssociateOrder", AssociateOrder);

    // 서비스용 라우터
    app.use("/room", Room);
    app.use("/user", User);
    app.use("/order", Order);
    app.use("/orders", Orders);
    app.use("/register", Register);

    /**
     * @TODO : 안드로이드 라우터 코드 수정
     */
    app.use("/current-deliver-location", CurrentLocation);

    return app;
  },
};

export default router;