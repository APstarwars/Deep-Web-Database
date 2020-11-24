const searchController = require('../control/searchController');
const searchRoute = require('koa-router')({
    prefix: '/search'
});

searchRoute.get('/:search', searchController.search);
searchRoute.get('/source/:search', searchController.searchSource);
searchRoute.get('/reference/:search', searchController.searchReference);

module.exports = searchRoute;