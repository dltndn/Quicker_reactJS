import { Application } from "express";

const port = {
  init: (app: Application) => {
    const HTTP_PORT = process.env.NODE_ENV === "development" ? process.env.HTTP_LOCAL_SERVER_PORT : process.env.HTTP_AWS_SERVER_PORT;
    return app.listen(HTTP_PORT, () => console.log(`App is listening on port ${HTTP_PORT} !`));
  },
};
export default port