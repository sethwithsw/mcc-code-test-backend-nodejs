const Router = require('express').Router;
const RecordService = require('../../services/recordService');
const auth = require('../middlewares/auth');

const route = Router();

function recordRoutes(app) {
    app.use('/record', route);

    route.post(
        '',
        auth,
        async (req, res, next) => {
            try {
                const recordService = new RecordService();
                const result = await recordService.createRecord(req.body);
                return res.status(201).json(
                    {
                        ...result,
                        user: req.user
                    });
            } catch (err) {
                console.log(err);
                return next(err);
            }
        }
    )

    route.get(
        '/:id',
        auth,
        async (req, res, next) => {
            try {
                const id = req.params.id;
                const from = req.query.from;
                const to = req.query.to;
                const recordService = new RecordService();
                const result = await recordService.queryRecord({
                    userId: id,
                    from: from,
                    to: to
                });
                return res.status(200).json(
                    result
                )
            } catch (err) {
                console.log(err);
                return next(err);
            }
        }
    )
}

module.exports = recordRoutes;