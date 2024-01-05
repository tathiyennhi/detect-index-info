// socketConfig.js

const socketIO = require("socket.io");

function initializeSocket(server) {
  const io = socketIO(server, {
    allowEIO3: true,
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
      // path: "/socket.io",
      // transports: ["websocket", "polling"], // Cho phép sử dụng WebSocket và polling (XHR Polling)
      // allowEIO3: true, // Cho phép kết nối từ các khách hàng Socket.IO phiên bản 3.x
      // forceNew: true, // Tạo kết nối mới mỗi khi kết nối với máy chủ
      // reconnection: false, // Ngăn chặn máy khách thử tự động kết nối lại khi mất kết nối
      // secure: false, // Cho phép kết nối không an toàn (HTTP)
      // rejectUnauthorized: false,
    },
  });
  return io;
}

function setupCorsMiddleware(app) {
  app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", " 3.2.1");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
  });
}

const SOCKET_THROTTLE_INTERVAL = process.env.SOCKET_THROTTLE_INTERVAL || 300;

module.exports = { initializeSocket, setupCorsMiddleware, SOCKET_THROTTLE_INTERVAL };
