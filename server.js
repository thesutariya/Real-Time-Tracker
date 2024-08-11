const express = require('express')
const app = express()
const port = 3000
const path = require("path");
const socket = require("socket.io")(server);

app.get('/', (req, res) => {
    res.send('Hello World!')
})




app.listen(port, () => {
    console.log(index)
})

io.on("connection",(socket) => { //function
    socket.on("send-location", function (data) {
        io.emit("receive-location", { id: socket.id, ...data });
    });
    socket.on("disconnect", function () {
        io.emit("user-disconnected", socket.id);
    });
});

app.set('view engine', 'ejs'); //set
app.set(express.static(path.join(__dirname, 'public')));