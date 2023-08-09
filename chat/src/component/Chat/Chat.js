import React, { useEffect, useState } from "react";
import sendIcon from '../../images/SendIcon.png'
import close from '../../images/close.png'
import {user} from "../Join/Join";
import socketIO from "socket.io-client";
import './Chat.css'
import Message from "../Message/Message";
import ReactScrollBottom from 'react-scroll-to-bottom'


let socket;
const ENDPOINT = "https://chat-app-9anf.onrender.com";

const Chat = () => {
  const[id,setId]=useState("");
  const[messages,setMessages]=useState([]);

  const send=()=>{
    const message=document.getElementById('chatInput').value;
    socket.emit('message',{message,id});
    document.getElementById('chatInput').value="";
  }

  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });
    socket.on('connect', () => {
      setId(socket.id)
    });

    socket.emit('joined',{user});

    socket.on('welcome',(data)=>{
      setMessages([...messages,data]);
      console.log(data.user, data.message);
    })

    socket.on('broadcast',(data)=>{
      setMessages([...messages,data]);
      console.log(data.user, data.message)
    })

    socket.on('leave',(data)=>{
      setMessages([...messages,data]);
      console.log(data.user, data.message)
    })
    return () => {
      socket.disconnect();
      socket.off();
    }
    // eslint-disable-next-line
  }, []);

  console.log(messages)
  useEffect(()=>{
    socket.on('sendMessage',(data)=>{
      setMessages([...messages,data]);
      console.log(data.user,data.message,data.id)
    })
    return ()=>{
      socket.off();
    }
  },[messages])

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h2>A CHAT</h2>
         <a href="/"><img src={close} alt="close" /></a>
        </div>
        <ReactScrollBottom className="chatBox">
          {messages.map((item,i)=>{
            return <Message message={item.message} user={item.id===id?'':item.user} classs={item.id===id?'right':'left'}/>
          })}
        </ReactScrollBottom>
        <div className="inputBox">
            <input type="text" name="input" id="chatInput" />
            <button onClick={send} className="sendBtn"><img src={sendIcon} alt="Send" /></button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
