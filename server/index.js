const { db } = require("./db");
const PORT = process.env.PORT || 8080;
const app = require("./app");
const seed = require("../script/seed");
const ws = require("ws");
const User = require("./db/models/User");

const init = async () => {
  try {
    if (process.env.SEED === "true") {
      await seed();
    } else {
      await db.sync();
    }
    // start listening (and create a 'server' object representing our server)
    const server = app.listen(PORT, () =>
      console.log(`Mixing it up on port ${PORT}`)
    );
    const socketServer = new ws.Server({ server });

    let sockets = [];
    const socketMap = {};
    socketServer("connection", (socket) => {
      sockets.push(socket);
      socket.on("close", () => {
        sockets = sockets.filter (s => s !== socket);
        // sockets.forEach((_socket) => _socket.send(message.toString));
      });
      socketServer.on('message', async(data) => {
        const message = JSON.parse(data);
        if (message.token) {
          const user = await User.findByToken(message.token);
          socketMap[user.id]= socket;
          // .keys(socketMap));
        }
        if (message.to){
          const s = socketMap[message.to];
          if (s){
            s.send(JSON.strinfigy(message));
          }
        }
      })
    });
  } catch (ex) {
    console.log(ex);
  }
};

init();