// Interfaces with database for data creation usecases

const connection = require('../database/connector');

class InsertController {
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

    // Adds a source to the database
    static async addSource (ctx) {
        return new Promise((resolve, reject) => {
            console.log(ctx.request.body);
            const query = 'INSERT INTO Source VALUES (?,?)';
            connection.query({
                sql: query,
                values: [ctx.request.body.clearnet_link, ctx.request.body.name]
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

    // Adds a reference to the database
    static async addReference (ctx) {
        return new Promise((resolve, reject) => {
            console.log(ctx.request.body);
            const query = 'INSERT INTO Reference VALUES (?)';
            connection.query({
                sql: query,
                values: [ctx.request.body.clearnet_link]
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

module.exports = InsertController;