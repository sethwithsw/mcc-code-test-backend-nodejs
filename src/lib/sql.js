const MySQL = require('mysql');
const config = require('../config/config').database;

const connection = MySQL.createConnection({
    host: config.endpoint,
    user: config.user,
    password: config.pw,
    port: config.port,
    database: config.db
});

connection.connect(err => {
    if (err) throw err;
    console.log('connected to db');
});

module.exports = connection;

/* function SQL(customConfig) {
    const cfg = customConfig === undefined ? config.database : customConfig;

    const connection = MySQL.createConnection({
        host: cfg.endpoint,
        user: cfg.user,
        password: cfg.pw,
        port: cfg.port,
        database: cfg.db
    });

    this.addUser = (email, pw, clinic, phone, address) => {
        return new Promise(async (resolve, reject) => {

            connection.connect();

            await connection.query(`INSERT INTO user_account(email, pw, clinic_name, phone, address) VALUES ('${email}', '${pw}', '${clinic}', '${phone}', '${address}');`,
                (err, rows) => {
                    if (err) {
                        throw err;
                    }

                    connection.end();

                    resolve(true);
                });
            }
        )
    };

    this.getUser = async (email) => {
        return new Promise(async (resolve, reject) => {

            connection.connect();

            await connection.query(`SELECT * FROM user_account WHERE email = '${email}'`,
                (err, rows) => {
                    if (err) {
                        throw err;
                    }
                    connection.end();

                    resolve(rows);
                });
            }
        )
    };
}

module.exports = SQL; */