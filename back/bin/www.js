const mongoose = require('mongoose');
const http = require('http');
const bluebird = require('bluebird');

global.isLocal = process.argv[2] === 'DEV';

// const PORT = isLocal ? 8001 : 8000;
const PORT = 8000;

bluebird.config({
    cancellation: true
});

function AppError({ name, httpCode, description, isNonOperational, responseBody }) {
    Error.call(this);
    Error.captureStackTrace(this);
    this.name = name;
    this.httpCode = httpCode;
    this.description = description;
    this.isNonOperational = isNonOperational;
    this.responseBody = responseBody;
}


AppError.prototype = Object.create(Error.prototype);
AppError.prototype.constructor = AppError;

global.AppError = AppError;


const debug = require('debug')('telegram-tinder-server:server');

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

const connectDb = () => {
    const connectionUrl = isLocal ? "mongodb://localhost:27017/ships-dev" : "mongodb://db:27017/ships";
    console.log('CONNECTING TO DB', connectionUrl)

    mongoose.Promise = bluebird;
    mongoose.set('useCreateIndex', true);

    const options = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    };

    mongoose.connect(connectionUrl, options)
        .then(async () => console.log('DB CONNECTED'));

    return mongoose.connection
};

const startServer = async () => {
    const app = require('../app');

    const port = normalizePort(PORT);
    app.set('port', port);
    const server = http.createServer(app);
    /**
     * Event listener for HTTP server "listening" event.
     */

    function onListening() {
        const addr = server.address();
        const bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        debug('Listening on ' + bind);
    }

    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
};

connectDb()
    .on('error', console.log)
    .on('disconnected', connectDb)
    .once('open', startServer);