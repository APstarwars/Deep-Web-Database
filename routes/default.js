// Define a default router that other routers will branch off of
const defaultRouter = require('koa-router')({
    prefix: '/api/v1'
});
// Define other branching routers
const domainRouter = require('./domain.js');
const searchRouter = require('./search.js');
const insertRouter = require('./insert.js');

// Default routes
defaultRouter.get('/', ctx => {
    ctx.status = 200;
    ctx.body = {route: 'Default'};
});

// Other routes
defaultRouter.use(domainRouter.routes());
defaultRouter.use(searchRouter.routes());
defaultRouter.use(insertRouter.routes());

// Inject routes into Koa API
function addRouters (api) {
    api.use(defaultRouter.routes());
    api.use(defaultRouter.allowedMethods());
}

module.exports = addRouters;