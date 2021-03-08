const config = {
    // Server port
    port: 3000,

    // JWT secret
    jwtSecert: 'RandomStringHereButKeepItSimpleInCodeTest',

    // API
    api: {
        prefix: "/api"
    },

    // DB 
    database: {
        endpoint: "",
        port: 3306,
        user: "",
        pw: "",
        db: ""
    }
}

module.exports = config;