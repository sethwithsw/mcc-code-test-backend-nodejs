const express = require('express');
const bodyParser = require('body-parser');
const routes = require('../api/api');
const config = require('../config/config');

const expressLoader = ( app ) => {
    /**
     * Loader for express here
     * Add useful middleware, main route etc
     */

    // Health check
    app.get('/status', (req, res) => {
        res.status(200).end();
    });

    // Body Parser for body to json
    app.use(bodyParser.json());

    // Add main route here
    app.use(config.api.prefix, routes());

    // Error handlers here
    // TODO: Add Error handler
    app.use((err, req, res, next) => {
        res.status(404).json({
            error: err
        })
    });
}

module.exports = expressLoader;