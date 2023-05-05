import express, { Application } from "express";
require("dotenv").config();
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

httpServer.listen(process.env.SOCKET_PORT);

export = io
