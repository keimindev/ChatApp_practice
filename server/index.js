const express = require("express");
const app = express();
//u need this for socket.io
const http = require("http");
const cors = require("cors");
//import socket.io lib
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    //url which working with this server
    origin: "http://localhost:3000",
    method: ["GET", "POST"],
  },
});

//how to connect with io
//if someone connect to chat then you can see id
io.on("connection", (socket) => {
  console.log("User Connected ", socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`user with id :${socket.id} joined room : ${data}`);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    //send mes to current room
    socket.to(data.room).emit("receive_message", data);
  });
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("server running");
});
