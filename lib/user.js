const db = require('./db.js');

class User {
  constructor() {
    this.id = 12345;
  };

  findOne(username, cb) {
    console.log('In User.findOne, username passed in: ', username);
    // return false;
    let error = null;
    let value = new User();
    cb(error, value);
  };

  validPassword() {
    console.log('In User.validPassword');
    // return false;
    return true;
  }

  findById(id, cb) {
    let err = null;
    let user = { id: id };
    cb(err, user)
  }

  create(user_info) {
    let { first_name, last_name, email, password } = user_info;
    console.log(first_name);
    console.log(last_name);
    console.log(email);
    console.log(password);
  }
}

let user = new User();

module.exports.findOne = user.findOne;
module.exports.validPassword = user.validPassword;
module.exports.findById = user.findById;
module.exports.create = user.create;
