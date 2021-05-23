const uuid = require('uuid/v4')

module.exports = class User {
    constructor(username, mail, password){
        this.id = uuid();
        this.username = username;
        this.mail = mail;
        this.password = password;
        this.role = 'admin';
    }
}
