const moment = require('moment');
const connection = require('./sql');

const Sql  = () => {};
   
Sql.addUser = (email, pw, clinic, phone, address) => {
    return new Promise(async (resolve, reject) => {
        await connection.query('INSERT INTO user_account(email, pw, clinic_name, phone, address) VALUES (?, ?, ?, ?, ?)',
        [email, pw, clinic, phone, address],
        (err, rows) => {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }

            resolve(rows);
        });
    })
};

Sql.getUser = (id, email) => {
    return new Promise(async (resolve, reject) => {
        if (id === undefined && email === undefined) {
            reject("id and email are undefined");
            return;
        }
        let q = id === null ? 'SELECT * FROM user_account WHERE email = ?' : 'SELECT * FROM user_account WHERE id = ?';
        let qParams = id === null ? email : id;
        await connection.query(q,
        [qParams],
        (err, rows) => {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }

            resolve(rows);
        })
    })
}

Sql.createRecord = (id, doctor, patient, diagnosis, medication, consultFee, dateTime, hasFollowUp) => {
    return new Promise(async (resolve, reject) => {
        let now = moment().format('YYYY-MM-DD hh:mm:ss');
        await connection.query('INSERT INTO consult_record(clinic_id, doctor, patient, diagnosis, medication, consult_fee, date_time, has_follow_up, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [id, doctor, patient, diagnosis, medication, consultFee, dateTime, hasFollowUp, now],
        (err, rows) => {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }

            resolve(rows);
        })
    })
}

Sql.queryRecord = (id, from, to) => {
    return new Promise(async (resolve, reject) => {
        await connection.query('SELECT * FROM consult_record WHERE clinic_id = ? AND date_time >= ? AND date_time <= ?',
        [id, from, to],
        (err, rows) => {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }

            resolve(rows);
        });
    })
}


module.exports = Sql;