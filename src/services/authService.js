const Regex = require('../lib/regex');
const argon2 = require('argon2');
const Query = require('../lib/query');
const config = require('../config/config');
const jwt = require('jsonwebtoken');

function AuthService() {
    this.SignUp = async (userInput) => {
        return new Promise(async (resolve, reject) => {
            // Check User Input
            let err = '';
            // E Mail
            if (!userInput.email || !Regex.validateEmail(userInput.email)) {
                err = 'Invalid email format';
            }

            // Password
            else if (!userInput.pw || !Regex.validatePassword(userInput.pw)) {
                err = 'Invalid password';
            }

            // Clinic Name
            else if (!userInput.clinic || typeof userInput.clinic !== 'string' || userInput.clinic === '') {
                err = 'Invalid clinic name';
            }

            // Phone number
            else if (!userInput.phone || typeof userInput.phone !== 'string' || userInput.phone.length < 8) {
                err = 'Invalid phone number';
            }

            // Address
            else if (!userInput.address || typeof userInput.address !== 'string' || userInput.address === '') {
                err = 'Invalid address';
            }
            
            // Check if email already exist
            if (err === '') {
                let r = await Query.getUser(null, userInput.email);
                if (r[0]) {
                    err = 'Email already exist';
                }
            }

            if (err !== '') {
                reject(err);
                return;
            }
            
            // Add user into DB
            const hashedPw = await argon2.hash(userInput.pw);
            let r = await Query.addUser(userInput.email, hashedPw, userInput.clinic, userInput.phone, userInput.address);

            // When finished, return user and token
            console.log(`User created: ${userInput.email}`);
            r = await Query.getUser(null, userInput.email);
            let user = r[0];
            delete user.pw;
            const token = this.generateToken({email: user.email});
            
            // Finish
            resolve({
                user: user,
                token: token
            });
        }).catch(err => {
            throw err;
        });
    }

    this.SignIn = async (userInput) => {
        return new Promise(async (resolve, reject) => {
            const r = await Query.getUser(null, userInput.email);
            if (r[0]) {
                // Verifly password
                if (await argon2.verify(r[0].pw, userInput.pw)) {
                    // match
                    console.log(`${userInput.email} login success`);

                    // return user and token
                    const token = this.generateToken({email: r[0].email});
                    let user = Object.assign({}, r[0]);
                    delete user.pw;
                    resolve({
                        user: user,
                        token: token
                    });
                } 
            }
            reject('Invalid email or password');
        }).catch(err => {
            throw err;
        })
    }

    this.generateToken = (str) => {
        return jwt.sign(str, config.jwtSecert);
    }
}

module.exports = AuthService;