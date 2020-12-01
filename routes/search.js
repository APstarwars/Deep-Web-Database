// Define a router that controls requests to /search
const searchController = require('../control/searchController');
const searchRoute = require('koa-router')({
    prefix: '/search'
});

// Search engine routes
searchRoute.get('/:search', searchController.search);
searchRoute.get('/source/:search', searchController.searchSource);
searchRoute.get('/reference/:search', searchController.searchReference);

module.exports = searchRoute;