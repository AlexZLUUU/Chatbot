import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";
import http from "http";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/public/index.html");
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
      io.emit('chat message', msg);
    });
});

server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});