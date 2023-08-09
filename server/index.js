const http=require('http');
const express=require('express');
const cors=require('cors');
const socketIO=require('socket.io');


const port=5000;
const app=express();

const users=[{}];
const server=http.createServer(app);
const io=socketIO(server);

io.on("connection",(socket)=>{
    console.log("New Connection")

    socket.on('joined',({user})=>{
        users[socket.id]=user;
        console.log(`${user} has joined`);
        socket.broadcast.emit('broadcast',{user:'Admin', message:`${users[socket.id]} has joined`});
        socket.emit('welcome',{user:'Admin',message:`Welcome to the chat,${users[socket.id]}`})
    })

    socket.on('message',({message,id})=>{
        io.emit('sendMessage',{user:users[id],message,id})
    })
    socket.on('disconnect',()=>{
        socket.broadcast.emit('leave',{user:'Admin',message:`${users[socket.id]} has left`})
        console.log('User has left')
    })
});

app.get('/',(req,res)=>{
    res.send("Hello")
})

server.listen(port,()=>{
    console.log(`App Running..... on http://localhost:${port}`)
})