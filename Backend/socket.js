const { Server } = require("socket.io");
const userModel = require("./models/userModel");
const captainModel = require("./models/captainModel");
let io;

function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on("join", async (data) => {
      const { userId, userType } = data;
      if (userType === "user") {
        await userModel.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      } else if (userType === "captain") {
        await captainModel.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      }
    });

    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;
      if (!location || !location.ltd || !location.lng) {
        return socket.emit("error", {
          message: "Invalid location data",
        });
      }
      await userModel.findByIdAndUpdate(userId, {
        location,
        ltd: location.ltd,
        lng: location.lng,
      });
    });

    socket.on("update-location-captain", async (data) => {
      const { userId, userType, location } = data;
      console.log(
        `userId: ${userId}, userType: ${userType}, location: ${location}`
      );
      if (userType === "user") {
        await userModel.findByIdAndUpdate(userId, {
          location,
        });
      } else {
        await captainModel.findByIdAndUpdate(userId, {
          location,
        });
      }
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

function sendMessageToSocketId(socketId, messageObject) {
  if (io) {
    io.to(socketId).emit("messageObject.event", messageObject.data);
  } else {
    console.log("Socket not initialized");
  }
}

module.exports = { initializeSocket, sendMessageToSocketId };
