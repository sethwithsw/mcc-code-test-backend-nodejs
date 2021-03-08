# mcc-code-test-backend-nodejs

# 1. Settng up the server
## Create database:
Run the sql command in
```
sql/createTable.sql
```
to create the table "user_account" and "consult_record" required to run the server

## Server config
Edit files in
```
src/config/config.js
```
to run the server
```
database: {
    endpoint: //database endpoint,
    port: //database port,
    user: //database user,
    pw: //database password,
    db: //database containing the tables
}
```

## Start server (require node.js)
run
```
node src/app.js
```

# 2. API reference:
```
/status
```
Health check
Should return: status 200

```
/api/auth/signup
```
POST Method:
Signup for new account
Required body:
```
{
    email:, //STRING, User's email, use as account name
    pw:, //STRING, Password
    clinic:, //STRING,Clinic name
    phone:, //STRING, Phone number
    address:, //STRING, Clinic address
}
```
Should return: status 201 and:
```
{
    user: {}, //Contain user's info
    token: {}, //Json Web Token for api
}
```

```
/api/auth/signin
```
POST Method:
Sign in
Required body:
```
{
    email:, //STRING, User's email
    pw: //STRING, password
}
```
Should return: status 200 and:
```
{
    user: {}, // Contain user's info
    token: {}, // Json Web Token for api
}
```

```
/api/record
```
POST Method:
Create a new record
Require JWT in request header
Required body:
```
{
    userId: //STRING, User's id, returned in user object when signin
    doctor:, //STRING, Doctor's name
    patient:, //STRING, Patient's name
    diagnosis, //STRING
    medication, //STRING
    consultFee, //Number
    dataTime, //STRING, in YYYY-MM-DD hh:mm:ss format
    hasFollowUp, //Boolean
}
```
Should return: status 201 and:
```
{
    record_id: // The id of the record created,
    user: {}
}
```

```
/api/record/:id?from=&to=
```
GET Method:
Query for record
Require JWT in request header
Params:
```
:id: //User's id, returned in user object when signin
```
Query:
```
from: //STRING, YYYY-MM-DD, Required
to: //STRING, YYYY-MM-DD, Required
```
Should return: status 200 and:
```
{
    [
        {
            // Array of record object
        }
    ]
}
```