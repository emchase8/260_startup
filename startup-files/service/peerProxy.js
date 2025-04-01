const {WebSocketServer} = require('ws');

function peerProxy (server) {
    const socket_server = new WebSocketServer({server});

    socket_server.on('connection', (socket) => {
        socket.is_alive = true;

        socket.on('message', function message(data) {
            socket_server.clients.forEach((client) => {
                //checks if the client isn't me and that they are alive and then sends the message
                if (client !== socket && client.readyState === WebSocket.OPEN) {
                    client.send(data);
                }
            });
        });

        //makes it so other people know we are alive
        socket.on('pong', () => {
            socket.is_alive = true;
        })
    });

    //checking livelyhood of all clients
    setInterval(() => {
        socket_server.clients.forEach(function each(client) {
            if (client.is_alive === false) return client.terminate();
            client.is_alive = false;
            client.ping();
        });
    }, 10000);
}

module.exports = {peerProxy};