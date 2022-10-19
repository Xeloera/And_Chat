const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const name = prompt('What is your name?')
appendMessage(`${name} has joined`)
socket.emit('new-user', name)

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
  appendMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`)
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  // document.querySelector('emoji-picker')
  // .addEventListener('emoji-click', event => appendMessage(`You: ${event}`));
  
  const message = messageInput.value
  appendMessage(`${name}: ${message}`)
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}

 document.querySelector('emoji-picker')
   .addEventListener('emoji-click', event => {
    const messageInput = document.querySelector("#message-input")
    const emoji = event.detail.emoji.unicode
    console.log(emoji)
    messageInput.value = messageInput.value +" "+emoji
    //appendMessage(emoji)
    console.log(messageInput)
    console.log(messageContainer)
   }); 