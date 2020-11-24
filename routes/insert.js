const insertController = require('../control/insertController');
const insertRoute = require('koa-router')({
    prefix: '/insert'
});

insertRoute.post('/domain', insertController.addDomain);

module.exports = insertRoute;