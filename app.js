const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");

const app = express();
const port = 3000;

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO with the HTTP server
const io = socketIo(server);

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Define the route to render the EJS file
app.get('/', (req, res) => {
    res.render('index'); // Render the index.ejs file
});

// Set up Socket.IO connection handling
io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on("send-location", (data) => {
        io.emit("receive-location", { id: socket.id, ...data });
    });

    socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
        io.emit("user-disconnected", socket.id);
    });
});

// Start the server
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
