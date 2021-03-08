const Query = require('../lib/query');

function RecordService() {
    this.createRecord = async (userInput) => {
        return new Promise(async (resolve, reject) => {
            // Check User Input
            let err = '';
            if (!userInput.userId) {
                err = 'Invalid user';
            }

            else if (!userInput.doctor || typeof userInput.doctor !== 'string') {
                err = 'Invalid doctor name';
            }

            else if (!userInput.patient || typeof userInput.patient !== 'string') {
                err = 'Invalid patient name';
            }

            else if (!userInput.diagnosis || typeof userInput.diagnosis !== 'string') {
                err = 'Invalid diagnosis';
            }

            else if (!userInput.medication || typeof userInput.medication !== 'string') {
                err = 'Invalid medication';
            }

            else if (!userInput.consultFee || typeof userInput.consultFee !== 'number') {
                err = 'Invalid consultation fee';
            }

            else if (!userInput.dateTime || typeof userInput.dateTime !== 'string') {
                err = 'Invalid date time';
            }
            
            else if (userInput.hasFollowUp === undefined || typeof userInput.hasFollowUp !== 'boolean') {
                err = 'Invalid follow up format';
            }

            // check if user id exist
            if (err === '') {
                let r = await Query.getUser(userInput.userId);
                if (r.length === 0) {
                    err = 'Invalid user';
                } else {
                    var user = r[0];
                }
            }

            if (err !== '') {
                reject(err);
                return;
            }

            // Checking passed, create record here
            console.log(`Creating new record from: ${user.id}, ${user.email}`);
            let r = await Query.createRecord(user.id, userInput.doctor, userInput.patient,
                userInput.diagnosis, userInput.medication, userInput.consultFee, userInput.dateTime, userInput.hasFollowUp);

            resolve({
                record_id: r.insertId
            });
        })
    }

    this.queryRecord = async (userInput) => {
        return new Promise(async (resolve, reject) => {
            // Check user id
            let err = '';
            if (!userInput.userId) {
                err = 'Invalid user';
            }

            else if (!userInput.from || typeof userInput.from !== 'string' ||
            !userInput.to || typeof userInput.to !== 'string') {
                err = 'Invalid date';
            }

            // check if user if exist
            if (err === '') {
                let r = await Query.getUser(userInput.userId);
                if (r.length === 0) {
                    err = 'Invalid user';
                } else {
                    var user = r[0];
                }
            }

            if (err !== '') {
                reject(err);
                return;
            }

            // Checking passed, query record
            let r = await Query.queryRecord(user.id, userInput.from, userInput.to);
            console.log(`Query record for user(id: ${user.id}), ${r.length} records found`)
            resolve(r);
        })
    }
}

module.exports = RecordService;