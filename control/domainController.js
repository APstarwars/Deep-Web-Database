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

    // Lists mirrors of a database
    static async showMirrors (ctx) {
        return new Promise((resolve, reject) => {
            console.log(ctx.params.site);
            const query = 'SELECT domain FROM Mirror_Domain WHERE document IN (SELECT document FROM Mirror_Domain WHERE domain=?);'
            connection.query({
                sql: query,
                values: [ctx.params.site]
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

module.exports = DomainController;