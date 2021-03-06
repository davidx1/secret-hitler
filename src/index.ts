import http from "http";
import express from "express";
import cors from "cors";
import { Server } from "colyseus";
import { monitor } from "@colyseus/monitor";
import path from "path";
// import socialRoutes from "@colyseus/social/express"

import { MyRoom } from "./MyRoom";

const port = Number(process.env.PORT || 3001);
const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const gameServer = new Server({
  server
});

// register your room handlers
gameServer.define("my_room", MyRoom);

/**
 * Register @colyseus/social routes
 *
 * - uncomment if you want to use default authentication (https://docs.colyseus.io/authentication/)
 * - also uncomment the import statement
 */
app.use(express.static(path.join(__dirname, "../client/build")));
// register colyseus monitor AFTER registering your room handlers
app.use("/colyseus", monitor());

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "..//client/build/index.html"));
});

app.get("*", function (req, res) {
  res.redirect("/");
});

gameServer.listen(port);
console.log(`Listening on ws://localhost:${port}`);
