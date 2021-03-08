const Router = require('express').Router;
const AuthRoutes = require('./routes/authRoutes');
const RecordRoutes = require('./routes/recordRoutes');

function Api() {
    const app = Router();

    AuthRoutes(app);
    RecordRoutes(app);

    return app
}

module.exports = Api;