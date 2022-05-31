const express = require("express");
const app=express();
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

//Socket..
//creating another separate server for socket io i.e., http server..
const http = require('http').createServer(app);
let port = process.env.PORT || 3000;
http.listen(port, function(){
    console.log("server started on port 3000");
});

const io = require('socket.io')(http)   //socket will run on http server..s
//when a client connects with the server..
io.on('connection', (socket) =>{
    console.log('connected');
    // listening the emiited(sent) message from client..
    socket.on('messageEvent', function(msg){
        socket.broadcast.emit('messageEvent', msg); //this will send this message to all servers except the client itself
    })
})





