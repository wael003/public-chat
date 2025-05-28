// Send messages 

const socket = io();
  const form = document.getElementById('form');
  const input = document.getElementById('input');
  const messages = document.getElementById('messages');

  const sender = localStorage.getItem('userId'); // You could dynamically load this from token or profile
  const token = localStorage.getItem('token');
  const receiver = sessionStorage.getItem('receiver');

  // Submit chat message
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const content = input.value.trim();
    if (content) {
      try {
        const res = await fetch('http://localhost:3000/chat/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
           },
          body: JSON.stringify({ sender,receiver, content })
        });

        const data = await res.json();
        console.log(data.message);
        if(data.message === 'Invalid or expired token'){
            window.location.href = "./SignIn.html";
        }
        input.value = '';
      } catch (err) {
        console.error('Failed to send message', err);
      }
    }
  });

  // Incoming message from socket
  socket.on('chat message', function(msg) {
    const item = document.createElement('li');
    item.innerHTML = `<strong>${msg.sender}:</strong> ${msg.content}`;
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
  });
socket.onAny((event, ...args) => {
  console.log(`📲 Received: ${event}`, args);
});