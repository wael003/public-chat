// fetch("http://localhost:3000/user/", {
//   method: "GET",
// })
//   .then(res => res.json())
//   .then(data => {
//     console.log("User info:", data);
//     const menu = document.getElementById('user-list');

//     if (data.data && Array.isArray(data.data)) {
//       for (let i = 0; i < data.data.length; i++) {
//         const user = data.data[i];
//         const item = document.createElement('li');
//         item.className = 'user-item'; // Add class
//         item.setAttribute('data-user-id', user._id); // Add data-user-id
//         item.textContent = user.username; // Set username as text
//         menu.appendChild(item);
//         menu.scrollTop = menu.scrollHeight;
//       }
//       const userItems = document.querySelectorAll('.user-item');
//       const chatHeader = document.querySelector('#chat-container h2');

//       userItems.forEach(item => {
//         item.addEventListener('click', () => {
//           const receiver = item.getAttribute('data-user-id');
//           sessionStorage.setItem('receiver', receiver);
//           const sender = localStorage.getItem('userId');
//           userItems.forEach(u => u.classList.remove('active'));

//           item.classList.add('active');

//           chatHeader.textContent = `Private Chat with ${item.textContent}`;

//           fetch(`http://localhost:3000/chat/users?sender=${sender}&receiver=${receiver}`, {
//             method: "GET",
//           })
//             .then(res => res.json())
//             .then(data => {
//               console.log("chat info:", data.messages);
//               const messages = document.getElementById('messages');
//               messages.innerHTML = "";

//               for (var i = 0; i < data.messages.length; i++) {
//                 const item = document.createElement('li');
//                 item.innerHTML = `<strong>${data.messages[i].sender.username}:</strong> ${data.messages[i].content}`;
//                 messages.appendChild(item);
//                 messages.scrollTop = messages.scrollHeight;

//               }

//             })
//             .catch(err => {
//               console.error("Failed to get user info", err);
//             });


//         });
//       });
//     } else {
//       console.error("Unexpected data format:", data);
//     }
//   })
//   .catch(err => {
//     console.error("Failed to get user info", err);
//   });





fetch("http://localhost:3000/chat/get", {
  method: "GET",
})
.then(response => response.json())
.then(data => {
console.log("chat info :"+data[0].sender.username);
    for (var i = 0; i < data.length; i++) {
      const messages = document.getElementById('messages');
      const item = document.createElement('li');
      item.innerHTML = `<strong>${data[i].sender.username}:</strong> ${data[i].content}`;
      messages.appendChild(item);
      messages.scrollTop = messages.scrollHeight;

    }
  })
  .catch((err) => {
    console.log(err);
  })