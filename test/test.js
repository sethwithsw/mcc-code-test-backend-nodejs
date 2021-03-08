const expect = require('chai').expect;
const chai = require('chai')
chai.use(require('chai-as-promised'));
const AuthService = require('../src/services/authService');
const RecordService = require('../src/services/recordService');

describe('Authentication', async () => {
    describe('Register', async () => {
        const auth = new AuthService();
        let userInput = {
        }

        it('should throw error when email is missing ', async () => {
            await expect(auth.SignUp(userInput)).to.be.rejectedWith('Invalid email format');
        });
        
        it('should throw error when email format is invalid', async () => {
            userInput.email = '123@123';
            await expect(auth.SignUp(userInput)).to.be.rejectedWith('Invalid email format');
        });

        it('should throw error when pw is missing', async () => {
            userInput.email = 'mcc.code.test@mcc.com';
            await expect(auth.SignUp(userInput)).to.be.rejectedWith('Invalid password');
        });
        
        it('should throw error when pw length is wrong', async () => {
            userInput.pw = '1234567';
            await expect(auth.SignUp(userInput)).to.be.rejectedWith('Invalid password');
        });
        
        it('should throw error when pw contains not acceptable character', async () => {
            userInput.pw = '$%^&()#123456';
            await expect(auth.SignUp(userInput)).to.be.rejectedWith('Invalid password');
        });

        it('should throw error when clinic is missing', async () => {
            userInput.pw = 'MccCodeTestPw1';
            await expect(auth.SignUp(userInput)).to.be.rejectedWith('Invalid clinic name');
        });

        it('should throw error when clinic name was not string', async () => {
            userInput.clinic = 123;
            await expect(auth.SignUp(userInput)).to.be.rejectedWith('Invalid clinic name');
        })
        
        it('should throw error when clinic is blank', async () => {
            userInput.clinic = '';
            await expect(auth.SignUp(userInput)).to.be.rejectedWith('Invalid clinic name');
        });

        it('should throw error when phone number is missing', async () => {
            userInput.clinic = 'MCC Clinic';
            await expect(auth.SignUp(userInput)).to.be.rejectedWith('Invalid phone number');
        })

        it('should throw error when phone number was not string', async () => {
            userInput.phone = 12345678;
            await expect(auth.SignUp(userInput)).to.be.rejectedWith('Invalid phone number');
        });
        
        it('should throw error when phone number length is lower than 8', async () => {
            userInput.phone = '1234567';
            await expect(auth.SignUp(userInput)).to.be.rejectedWith('Invalid phone number');
        });

        it('should throw error when address is missing', async () => {
            userInput.phone = '12345678';
            await expect(auth.SignUp(userInput)).to.be.rejectedWith('Invalid address');
        });
        
        it('should throw error when address was not string', async () => {
            userInput.address = 3456;
            await expect(auth.SignUp(userInput)).to.be.rejectedWith('Invalid address');
        });
        
        it('should throw error when address is blank', async () => {
            userInput.address = '';
            await expect(auth.SignUp(userInput)).to.be.rejectedWith('Invalid address');
        });

        it('should throw error when email is already exist', async () => {
            userInput.address = '18 ABC Street';
            await expect(auth.SignUp(userInput)).to.be.rejectedWith('Email already exist');
        });

        it.skip('should return user and token when user created', async () => {
            userInput.address = '18 ABC Street';
            const result = await auth.SignUp(userInput);
            expect(result).to.include.all.keys('user', 'token');
        })

        it('should return user and token when login success', async () => {
            const result = await auth.SignIn(userInput);
            expect(result).to.include.all.keys('user', 'token');
        });

        // Not enough time to follow TDD, stop here!

    });

    describe('Create record', () => {
        const record = new RecordService();
        let userInput = {};
        it('should throw error when email is missing', async () => {
            await expect(record.createRecord(userInput)).to.be.rejectedWith('Invalid user');
        });

        it('should throw error when doctor is missing', async () => {
            userInput.email = '123@1223.com';
            await expect(record.createRecord(userInput)).to.be.rejectedWith('Invalid doctor name');
        });

        // Not enough time to do test case, stop here!

        it('should throw error when email is not exist in db', async () => {
            userInput.email = '123@1223.com';
            userInput.doctor = 'Dr. X';
            userInput.patient = 'WFD L';
            userInput.diagnosis = 'Schizoaffective Disorder';
            userInput.medication = 'panadol 100oz';
            userInput.consultFee = 65536.67;
            userInput.dateTime = require('moment')().format('YYYY-MM-DD hh:mm:ss');
            userInput.hasFollowUp = false;
            await expect(record.createRecord(userInput)).to.be.rejectedWith('Invalid user');
        });

        it('should return true when record is created', async () => {
            userInput.email = 'mcc.code.test@mcc.com';
            const result = await record.createRecord(userInput);
            expect(result).to.be.equal(true);
        });
        
        it('should return an array when query records', async () => {
            let userInput = {
                email: 'mcc.code.test@mcc.com',
                from: '2021/03/04',
                to: '2021/03/05'
            };
            const result = await record.queryRecord(userInput);
            expect(result).to.be.an('array');
            console.log(result);
        })
    })
})