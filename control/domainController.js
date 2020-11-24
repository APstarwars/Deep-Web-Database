const connection = require('../database/connector');

class DomainController {
    static async showOnline (ctx) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM Online_Domains', (err, res) => {
                if (err) reject(err);
                ctx.status = 200;
                ctx.body = res;
                resolve();
            });
        }).catch(err => {
            console.log(err);
        });
    }

    static async updateDomain (ctx) {
        return new Promise((resolve, reject) => {
            console.log(ctx.request.body);
            const query = 'SELECT Update_Status(?,?);'
            connection.query({
                sql: query,
                values: [ctx.request.body.site, ctx.request.body.status]
            }, (err, res) => {
                if (err) reject(err);
                ctx.status = 200;
                ctx.body = "OK";
                resolve();
            });
        }).catch(err => {
            console.log(err);
        });
    }
}

module.exports = DomainController;