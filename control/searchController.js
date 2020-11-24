const connection = require('../database/connector');

class SearchController {
    // Calls the search function on the domains in the database
    static async search (ctx) {
        return new Promise((resolve, reject) => {
            console.log(ctx.params.search);
            const query = 'CALL Search(?);'
            connection.query({
                sql: query,
                values: [ctx.params.search]
            }, (err, res) => {
                if (err) reject(err);
                ctx.status = 200;
                ctx.body = res;
                resolve();
            });
        }).catch(err => {
            console.log(err);
        });
    }
}

module.exports = SearchController;