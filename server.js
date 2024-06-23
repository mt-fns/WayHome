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

    socket.on('joinRoom', ({userName, room}) => {
        // const user = userJoin(socket.id, userName, room);
        socket.join(room);
        io.to(room).emit("message","TEST");
    })

    socket.on('sendLocation', ({test1, test2}) => {
        console.log(test1, test2);
    })
})

httpServer.listen(3000, () => {
    console.log("Listening on port 3000");
})