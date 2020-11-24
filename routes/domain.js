const domainController = require('../control/domainController');
const domainRoute = require('koa-router')({
    prefix: '/sites'
});

domainRoute.get('/', domainController.showOnline);
domainRoute.post('/update', domainController.updateDomain);

module.exports = domainRoute;