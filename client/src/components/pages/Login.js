import React from 'react'
import { useNavigate } from 'react-router-dom';

function Login({ socket, name, setName, room, setRoom }) {
  const navigate = useNavigate();

  function joinRoom() {
    if (name !== '') {
      if (room !== '') {
        socket.emit('JoinedRoom', { name, room });
        navigate('/chat');
      } else {
        alert('Please choose a chatroom to enter');
      }
    } else {
      alert('Please enter a username');
    }
  }

  return (
    <div>
      <h3>Join A Chat</h3>
      <input
        type="text"
        placeholder="UserName"
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <select onChange={(event) => {
        setRoom(event.target.value);
      }}
      >
        <option></option>
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </select>
      <button onClick={joinRoom}>Join A Room</button>
    </div>
  )
}

export default Login