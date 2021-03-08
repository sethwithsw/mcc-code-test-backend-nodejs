const express = require('express');
const config = require('./config/config');
const expressLoader = require('./loaders/express');

async function startServer() {
    const app = express();

    expressLoader(app);

    app.listen(config.port, () => {
        console.log(`Server started on port ${config.port}`);
    }).on(`error`, error => {
        console.log(error);
        process.exit(1);
    });
}

// Start server here
startServer();