const searchController = require('../control/searchController');
const searchRoute = require('koa-router')({
    prefix: '/search'
});

searchRoute.get('/:search', searchController.search);

module.exports = searchRoute;