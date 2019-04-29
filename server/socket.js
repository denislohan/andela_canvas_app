import socket from 'socket.io'
//const io = socket(httpServer)
import http from 'http'
import {io} from './index.js'
console.log(io)

//const httpServer = http.createServer(app)

// io.on("connection", socket => {
//     console.log("New client connected"), setInterval(
//       () => getApiAndEmit(socket),
//       10000
//     );
//     socket.on("disconnect", () => console.log("Client disconnected"));
//   });  

  export default io
