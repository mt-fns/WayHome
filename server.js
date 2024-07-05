import { createServer } from "http";
import { Server } from "socket.io";
// import { userJoin } from "./utils/user";

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: process.env.NODE_ENV === "production" ? false : 
        ["http://localhost:5501", "http://127.0.0.1:5501", "http://localhost:5500", "http://127.0.0.1:5500"]
    }
})

io.on('connection', socket => {
    console.log(`User ${socket.id}`);

    // socket.on('message', data => {
    //     console.log(data);
    //     io.emit('message', `${data}`);
    // })
    socket.on('sendLocation', (room, location) => {
        console.log('sending', room, location);
        io.to(room).emit('message', location);
    })

    socket.on('joinRoom', (room) => {
        // const user = userJoin(socket.id, userName, room);
        console.log('joined', room);
        socket.join(room);
        // io.to(room).emit("message","TEST");
    })
})

httpServer.listen(3000, () => {
    console.log("Listening on port 3000");
})