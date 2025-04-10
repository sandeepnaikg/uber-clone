
const http = require("http");
const app = require("./app");
const { initializeSocket } = require("./socket");
const PORT = process.env.PORT || 6000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

initializeSocket(server);
