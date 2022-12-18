import express from 'express';
import http from 'http';

export default (app: express.Express) => {
  const httpServer = http.createServer(app);

  httpServer.on('listening', _onListening);
  httpServer.on('error', _onError);

  return httpServer;
};

const _onListening = () => console.log(`> Server started successfully on port ${process.env.PORT}`)

const _onError = (error: NodeJS.ErrnoException) => {
  if (error.syscall !== 'listen') throw error;

  const bind = `Port ${process.env.PORT}`;

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
}