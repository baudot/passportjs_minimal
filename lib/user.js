const db = require('./db.js');
const { v4: uuidv4 } = require('uuid');

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
    let salt = 'abcdefg'
    let query = `
      INSERT INTO users
      (id, password, salt, first_name, last_name, email, cash_position)
      VALUES
      ('${uuidv4()}', '${password}', '${salt}', '${first_name}', '${last_name}', '${email}', 1000000)
    `;
    console.log('query: ', query)
    db.query(query, (err, res) => {
      console.log(err, res);
    })
    db.query('SELECT * from users', (err, res) => {
      console.log(err, res);
    })
  }
}

let user = new User();

module.exports.findOne = user.findOne;
module.exports.validPassword = user.validPassword;
module.exports.findById = user.findById;
module.exports.create = user.create;
