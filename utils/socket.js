const socketIO = require('socket.io');
const { ROOMS, EVENT_EMIT } = require('../constants/socketEvent');
const { SOCKET_THROTTLE_INTERVAL } = require('../configs/socketConfig');

function validateInput(symbols) {
  if (!Array.isArray(symbols) && typeof symbols !== 'string') {
    console.error('input error');
    return [];
  }

  if (Array.isArray(symbols)) {
    return symbols.map((symbol) => symbol.trim().toUpperCase());
  }
  const ttt = symbols.split(',').map((symbol) => symbol.trim().toUpperCase());
  console.log({ ttt });
  return symbols.split(',').map((symbol) => symbol.trim().toUpperCase());
}

const handleRoomEvents = (socket) => {
  socket.on('join_market_room', (market) => {
    // tab HOSE + HNX
    socket.join(market);
    console.log(`Client joined room: ${market}`);
  });

  socket.on('leave_market_room', (market) => {
    socket.leave(market);
    console.log(`Client leaved market: ${market}`);
  });

  socket.on(ROOMS.JOIN_WATCH_LIST, (symbols) => {
    console.log('wll', { symbols });
    const symbolsRequest = validateInput(symbols); // `ACB` `FPT` ...

    if (!symbolsRequest.length) {
      return;
    }

    for (symbol of symbolsRequest) {
      socket.join('wl' + symbol);
      console.log(`Client joined room: ${symbol}`);
    }
  });

  socket.on(ROOMS.LEAVE_WATCH_LIST, (symbols) => {
    const symbolsRequest = validateInput(symbols);

    if (!symbolsRequest.length) {
      return;
    }

    for (symbol of symbolsRequest) {
      socket.leave('wl' + symbol);
      console.log(`Client Leave room: ${symbol}`);
    }
  });
};

function initializeSocket(server) {
  const io = socketIO(server, {
    allowEIO3: true,
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    },
  });
  return io;
}

function setupCorsMiddleware(app) {
  app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('X-Powered-By', ' 3.2.1');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
  });
}

function handleThrottlingSocket({
  io,
  market,
  symbol,
  data,
  throttlerSocket,
  type,
  lastUpdate,
  interval = SOCKET_THROTTLE_INTERVAL,
}) {
  const isSendSocket = Date.now() - (lastUpdate || 0) >= interval;
  if (isSendSocket) {
    io.to(market).emit(EVENT_EMIT.MARKET_PRICE_CHANGE, data);
  } else {
    const dataStore = throttlerSocket.get(`${symbol}_${market}`) || {};
    throttlerSocket.set(`${symbol}_${market}`, { ...dataStore, ...data });
  }
}

module.exports = { initializeSocket, setupCorsMiddleware, handleRoomEvents, handleThrottlingSocket };
