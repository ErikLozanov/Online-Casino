const WebSocketServer = require('ws').Server;

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Incoming connection...');

    const initialMessage = Math.floor(Math.random() * 14);
    ws.send(initialMessage.toString());
});

const sendMessageToClients = () => {
    console.log('Sending message to clients...');
    const computedRandomNum = Math.floor(Math.random() * 14);

    wss.clients.forEach((ws) => {
        if (ws.readyState === ws.OPEN) {
            ws.send(computedRandomNum.toString());
        }
    });
};

// Set up the interval and store the interval ID
const intervalId = setInterval(sendMessageToClients(), 25000);

// Optionally, you can add a cleanup function when the server is shutting down
process.on('SIGINT', () => {
    clearInterval(intervalId);
    wss.close(() => {
        console.log('WebSocket server closed.');
        process.exit();
    });
});
