import { Application} from "express";

import { errorController } from "../controllers";
import { Caver, associateOrder, averageCost, currentLocation, home, notFound, order, orders, register, room, user } from "../routes";
import { caverLimiter } from "./middlewares";

const router = {
  handle: (app: Application) => {
    // 개발용 라우터
    app.use("/", home);
    app.use("/AssociateOrder", associateOrder);

    // 서비스용 라우터
    app.use("/room", room);
    app.use("/user", user);
    app.use("/order", order);
    app.use("/orders", orders);
    app.use("/register", register);
    app.use("/current-deliver-location", currentLocation);
    app.use("/average", averageCost);

    app.use("/caver", caverLimiter, Caver);

    app.use("*", notFound);

    app.use(errorController.handler);
    return app;
  }
};

export default router;