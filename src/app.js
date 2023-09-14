import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from "socket.io";

import listen from './routes/listen.js';
import { connectToBroker } from './config/connectToBroker.js';

dotenv.config();

const app = express();
const serverPort = 3000;
const serverSocketPort = 5000;

const devOrigins = process.env.CORS_FRONTEND_DEV_DOMAINS?.split(' ');

app.use(cors({ devOrigins, optionsSuccessStatus: 200, credentials: true }));

app.use('/listen', listen);

// initSocket
export const io = new Server({
  cors: {
    origin: devOrigins,
  },
});

io.on("connect", (socket) => {
  console.log('someone has connected!');
  socket.on("disconnect", () => {
    console.log('someone has left!');
  })
});

io.listen(serverSocketPort, ()=>{
  console.log(`MRC Server socket listening on port ${serverSocketPort}`);
});


app.listen(serverPort, () => {
  console.log(`MRC Server listening on port ${serverPort}`);
  connectToBroker();
});
