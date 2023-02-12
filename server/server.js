const { createServer } = require("http");
const { Server } = require("socket.io");

const clientServer = createServer();
const io = new Server(clientServer,{
    cors: {
        origin: "http://127.0.0.1:5173/",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    socket.emit("hello", "world");
    socket.on("draw", (index) => {
        console.log("server recieved message")
        console.log("played", index)
    })
})

clientServer.listen(3000)


