var express = require('express');
var socket = require('socket.io');
var port = 8888;

// App setup
var app = express();
var server = app.listen(port, function() {
    console.log(`listening at ${port}`);
})

// Static files
app.use(express.static('public'));

// Socket setup
var io = socket(server);
var guestNumber = 0;

io.on('connection', onConnect);

function onConnect(socket) {
    console.log('socket connection ' + socket.id);
    console.log('guestNumber: ' + guestNumber);

    // Emit new name to socket
    var guestName = 'Guest' + guestNumber;
    guestNumber += 1;
    socket.emit('newName', {
        guestName: guestName
    });

    // Listen for events
    socket.on('chat', function(data){
        console.log('chat detected');
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data) {
        console.log('typing detected');
        socket.broadcast.emit('typing', data);
    });
}
