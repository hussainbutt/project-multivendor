const app = require('./app');
const connectDatabase = require('./db/Database.js');

// handling uncaught exceptions
process.on('uncaughtException', (err) => {
    console.log('Error: ', err.message);
    console.log("Shutting down the server to handle uncaught exception");


})


// config
if (process.env.NODE_ENV !== 'PRODUCTION') {
    require('dotenv').config({
        path: "backend/config/.env"
    });
}

// connect to db
connectDatabase();


// create server

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

// unhandled promise rejection

process.on('unhandledRejection', (err) => {
    console.log("Shutting down server for " + err.message);
    console.log("shutting down server for unhandle promise rejection");

    server.close(() => {
        process.exit(1);
    })


})
