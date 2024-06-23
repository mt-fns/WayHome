const socket = io('ws://localhost:3000')

function sendRoom(e) {
    e.preventDefault()
    const input = document.querySelector('#roomInput')
    if (input.value) {
        socket.emit('joinRoom', input.value)
        input.value = ""
    }
    input.focus()
}

function sendLocation() {
    console.log('location');
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {latitude: position.coords.latitude, longitude: position.coords.longitude})
    });
}

document.querySelector('#location').addEventListener('click', sendLocation)

document.querySelector('#room')
    .addEventListener('submit', sendRoom)

// Listen for messages 
socket.on("message", (data) => {
    const li = document.createElement('li')
    li.textContent = data
    document.querySelector('ul').appendChild(li)
})