const connection = require('../database/connector');

class DomainController {
    // Shows all domains currently online
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

    // Updates the status of a domain
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
                ctx.body = res;
                resolve();
            });
        }).catch(err => {
            console.log(err);
        });
    }

    // Adds a domain to the database
    static async addDomain (ctx) {
        return new Promise((resolve, reject) => {
            console.log(ctx.request.body);
            const query = 'INSERT INTO Domain VALUES (?,?,?,?,?,?,?)';
            connection.query({
                sql: query,
                values: [ctx.request.body.onion_link, ctx.request.body.name, ctx.request.body.owner, ctx.request.body.dof, ctx.request.body.ssl_verify, ctx.request.body.ssl_expire, ctx.request.body.status]
            }, (err, res) => {
                if (err) reject(err);
                ctx.status = 200;
                ctx.body = res;
                resolve();
            })
        }).catch(err => {
            console.log(err);
        });
    }
}

module.exports = DomainController;