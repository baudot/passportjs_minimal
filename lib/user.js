const db = require('./db.js');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const saltRounds = 12;

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
    // Overriding form input during testing;
    // eMail has to be unique and I don't want to
    // have to enter a new email entry each test.
    email = random_email();
    test_hash();
    let salt = 'abcdefg'
    let query = `
      INSERT INTO users
      (id, password, first_name, last_name, email, cash_position)
      VALUES
      ('${uuidv4()}', '${password}', '${first_name}', '${last_name}', '${email}', 1000000)
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

function test_hash() {
  let fake_password = 'omg_so_insecure';
  let other_password = 'this_is_the_wrong_password'
  let test_hash = undefined;
  bcrypt.hash(fake_password, saltRounds, function(err, hash) {
    test_hash = hash;
    console.log('The hash with salt attached is: ', test_hash);
    bcrypt.compare(fake_password, test_hash, function(err, result) {
      console.log('Test of correct password should return true: ', result)
    });
    bcrypt.compare(other_password, test_hash, function(err, result) {
      console.log('Test of incorrect password should return false: ', result)
    });
  });
}

function random_email() {
  function random_string() {
    return (Math.random() + 1).toString(36).substring(7);
  }
  return random_string() + '@' + random_string() + '.com';
}

let user = new User();

module.exports.findOne = user.findOne;
module.exports.validPassword = user.validPassword;
module.exports.findById = user.findById;
module.exports.create = user.create;
