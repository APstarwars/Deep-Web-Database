// Define a router that controls requests to /sites
const domainController = require('../control/domainController');
const domainRoute = require('koa-router')({
    prefix: '/sites'
});

// Domain oriented routes
domainRoute.get('/', domainController.showOnline);
domainRoute.post('/update', domainController.updateDomain);
domainRoute.get('/mirrors/:site', domainController.showMirrors);

module.exports = domainRoute;