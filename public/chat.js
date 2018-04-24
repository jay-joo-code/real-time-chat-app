var socket = io.connect('http://localhost:8888');

// Query DOM
var output = document.getElementById('output');
var handle = document.getElementById('handle');
var message = document.getElementById('message');
var btn = document.getElementById('send');
var feedback = document.getElementById('feedback');
var test = document.getElementById('test');

// Event Listeners
btn.addEventListener('click', emitChat);

message.addEventListener('keypress', function(key) {
    if (key.keyCode == 13) {
        emitChat();
    } else {
        socket.emit('typing', {
            handle: handle.innerHTML
        });
    }});

function emitChat() {
    socket.emit('chat', {
        socketId: socket.id,
        message: message.value,
        handle: handle.innerHTML
    });
    message.value = '';
}


// Listen for events
socket.on('chat', function(data) {
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('newName', function(data) {
    handle.innerHTML = data.guestName;
});

socket.on('typing', function(data) {
    feedback.innerHTML = '<p>' + data.handle + ' is typing...</p>';
});