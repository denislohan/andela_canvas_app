import express from 'express'
import bodyParser from 'body-parser'
const app = express();
import enginersRouter from './routes/engineers'
import authRouter from './routes/auth'
import socket from 'socket.io'


app.use(function(req, res, next) {
     console.log('new request')
     res.header("Access-Control-Allow-Origin", '*');
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     res.header('Access-Control-Allow-Credentials', true);

   next();
 });

 app.use(bodyParser.urlencoded({ extended: true }))
 app.use(bodyParser.json())
 
const PORT = process.env.PORT || 4001;
//app.use(cors)

var server= app.listen(PORT,()=>{
     console.log('server running on port '+PORT)
})

var io = socket.listen(server);
io.on("connection", socket => {
    console.log("client connected:")
    socket.on("disconnect", () => console.log("Client disconnected"));
  }); 

  app.set('socket_io',io)

  module.exports= {
       app, server
  }

app.use('/engineers',enginersRouter)
app.use('/auth',authRouter)

