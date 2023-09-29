import { AdminController } from "./AdminController";
import { ChatController } from "./ChatController";
import { ErrorController } from "./Error";
import { OrderController } from "./OrderController";
import { UserController } from "./UserController";

const adminController = new AdminController();
const chatController = new ChatController();
const errorController = new ErrorController();
const orderController = new OrderController();
const userController = new UserController();

export {
  adminController,
  chatController,
  errorController,
  orderController,
  userController,
};