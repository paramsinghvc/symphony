var User = require('../models/user'),
    Photo = require('../models/photo'),
    auth = require('../controllers/auth'),
    users = require('../controllers/users'),
    photos = require('../controllers/photos'),
    pruneIndexMiddleware = require('./app/middlewares/pruneIndex');

pruneIndexMiddleware.init(mongoose);

module.exports = function(app, express) {
    var apiRouter = express.Router();

    apiRouter.post('/authenticate', auth.check);

    // apiRouter.use(auth.validateTokenMiddleware);

    apiRouter.get('/me', auth.getUser)

    apiRouter.get('/', function(req, res) {
        res.status(200).json({
            msg: 'Welcome to symphony api.'
        });
    })

    apiRouter.route('/users')
        .post(users.store)
        .get(users.getAll)


    apiRouter.route('/users/:user_id')
        .get(users.getOne)
        .put(users.update)
        .delete(users.remove)

    apiRouter.post('/users/:user_id/photo/:photo_id', users.attachPhoto)

    apiRouter.post('/photos', photos.store)

    return apiRouter;
}
