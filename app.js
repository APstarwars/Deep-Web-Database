// Main application control program //
// Deep Web Domain Server Application created by Max vonBlankenburg //

const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const json = require('koa-json');
const routes = require('./routes/default');

const app = new Koa();
const port = 8229;

app.use(bodyparser());
app.use(json());

// Injecting the routes
routes(app);

app.listen(port, () => {console.log(`Listening on http://blue.cs.sonoma.edu:${port}/`)});
