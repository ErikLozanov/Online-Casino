const { default: Timer } = require('easytimer.js');
const WebSocketServer = require('ws').Server;

const wss = new WebSocketServer({ port: 8080 });
const timer = new Timer();

wss.on('connection', (ws) => {
    console.log('Incoming connection...');

    const initialMessage = Math.floor(Math.random() * 22);
    ws.send(initialMessage.toString());
});

const sendMessageToClients = () => {
    console.log('Sending message to clients...');
    const computedRandomNum = Math.floor(Math.random() * 22);

    wss.clients.forEach((ws) => {
        if (ws.readyState === ws.OPEN) {
            ws.send(computedRandomNum.toString());
        }
    });
};

// Set up the countdown timer to invoke sendMessageToClients every 20 seconds
// timer.addEventListener('secondsUpdated', function (e) {

// });

timer.addEventListener('targetAchieved', function (e) {
    // Reset the timer after 20 seconds
    sendMessageToClients();
    console.log('hi!');
    timer.reset();
    timer.start({ countdown: true, startValues: { seconds: 20 } });
});

// Start the timer initially
timer.start({ countdown: true, startValues: { seconds: 20 } });

// Optionally, you can add a cleanup function when the server is shutting down
process.on('SIGINT', () => {
    wss.close(() => {
        console.log('WebSocket server closed.');
        process.exit();
    });
});
