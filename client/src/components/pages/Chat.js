import React, { useEffect, useState } from 'react'

function Chat({ socket, name, room }) {
  const [message, setMessage] = useState('')
  const [messageList, setMessageList] = useState('');

  const sendMessage = async () => {
    if (message !== '') {
      const messageData = {
        name: name,
        room: room,
        message: message,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
      }

      await socket.emit('newMessage', messageData);
    }
  }

  useEffect(() => {
    socket.on("displayMessage", (data) => {
      console.log("LOOK HERE" + data.message);
      setMessageList((list) => [...list, data.message]);
      console.log(messageList)
      return () => socket.removeListener('displayMessage')
    });
  }, [socket]);


  return (
    <div>
      <h1>{room}</h1>
      <input type='text' placeholder='some text' onChange={(event) => { setMessage(event.target.value) }} />
      <button onClick={sendMessage}>&#9658;</button>
      {messageList.map((messages) => {
        return <h1>{messages.message}</h1>
      })}
    </div>
  )
}

export default Chat



  // useEffect(() => {
  //   console.log("Socket object:", socket); // Check if socket object is defined
  //   console.log("Socket connected:", socket.connected); // Check if socket is connected to server
  //   socket.on("displayMessage", (data) => {
  //     console.log(data)
  //   });
  // }, [socket]);

  // currently wathcing these videos
  // https://www.youtube.com/watch?v=ZKEqqIO7n-k&t=208s&ab_channel=WebDevSimplified
  // https://www.youtube.com/watch?v=NU-HfZY3ATQ&t=1470s&ab_channel=PedroTech
  // https://github.com/machadop1407/react-socketio-chat-app/blob/main/client/src/Chat.js