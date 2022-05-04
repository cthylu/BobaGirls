const { db } = require("./db");
const PORT = process.env.PORT || 8080;
const app = require("./app");
const seed = require("../script/seed");
const ws = require("ws");

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
    const webSocketServer = new ws.Server({ server });

    const sockets = [];

    webSocketServer.on("connection", (socket) => {
      sockets.push(socket);
      socket.on("message", (message) => {
        sockets.forEach((_socket) => _socket.send(message.toString));
      });
    });
  } catch (ex) {
    console.log(ex);
  }
};

init();