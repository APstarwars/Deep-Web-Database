const insertController = require('../control/insertController');
const insertRoute = require('koa-router')({
    prefix: '/insert'
});

insertRoute.post('/domain', insertController.addDomain);
insertRoute.post('/source', insertController.addSource);
insertRoute.post('/reference', insertController.addReference);

module.exports = insertRoute;