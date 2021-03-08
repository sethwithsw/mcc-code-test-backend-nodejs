class Regex {
    static validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    static validatePassword(str) { 
        return str == undefined || str == null ? false : /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9\.\,\`\~\!\@\#\$\%\^\&\*\(\)\-\+\{\}\[\]]{8,20}$/g.test(str);
    }
}

module.exports = Regex;