const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const feedback = document.getElementById('feedback')
const onlineUser = document.getElementById('online-user');
const name = prompt('What is your name?')
appendMessage('You Joined')
socket.emit('new-user', name)
socket.on('chat-message', data => {
    appendMessage(data.name + ":" + data.message)
    feedback.innerHTML = '';
})

// listener when user connected to the server
socket.on('user-connected', data => {
    appendMessage(data.name + '  connected')
    // console.log(data.users);
    // var allOnlineUser = '';
    // for(user in data.users){
    //     allOnlineUser=allOnlineUser+user.value;
    // }

    // onlineUser.innerHTML = allOnlineUser;
})
// listener when user disconnected from the server
socket.on('user-disconnected', name => {
    appendMessage(name + '  disconnected')
})

// listener to display when other user is typing
socket.on('user-is-typing', name => {
    feedback.innerHTML = '</br><p><em><b>' + name + '</b> is typing a message...</em></p>'
})
// submit event
messageForm.addEventListener('submit', e => {

    e.preventDefault();
    const message = messageInput.value
    appendMessage('You : ' + message)
    socket.emit('send-chat-message', message)
    messageInput.value = ''

})

// append any message to message container div
function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}

// to catch keypress function
messageInput.addEventListener('keypress', function () {
    socket.emit('typing-message', name)
})