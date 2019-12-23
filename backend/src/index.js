const cookieParser = require('cookie-parser');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const createServer = require('./createServer');
const db = require('./db');


const server = createServer();

server.express.use(cookieParser());
server.express.use((req, _, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    req.userId = userId;
  }

  next();
});

// another middleware
server.express.use(async (req, _, next) => {
  if (!req.userId) return next();

  const user = await db.query.user(
    { where: { id: req.userId } },
    '{ id, name, permissions, email }'
  );

  req.user = user;
  next();
});

server.start({
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL
  }
}, ({ port }) => console.log(`Server running on http://localhost:${port}`));
