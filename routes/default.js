// Define a default router that other routers will branch off of
const defaultRouter = require('koa-router')({
    prefix: '/api/v1'
});
// Define other branching routers

// Default routes
defaultRouter.get('/', ctx => {
    ctx.status = 200;
    ctx.body = {route: 'Default'};
});

// Other routes

// Inject routes into Koa API
function addRouters (api) {
    api.use(defaultRouter.routes());
    api.use(defaultRouter.allowedMethods());
}

module.exports = addRouters;