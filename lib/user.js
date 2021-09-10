const db = require('./db.js');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const saltRounds = 12;

class User {
  constructor(record) {
    if (record) {
      this.id = record.id;
      this.password = record.password;
      this.first_name = record.first_name;
      this.last_name = record.last_name;
      this.email = record.email;
      this.cash_position = record.cash_position;
    }
  };

  findOne(email, cb) {
    console.log('In User.findOne, email passed in: ', email);
    let query = `
      SELECT * FROM users
      WHERE email='${email}'
    `;
    db.query(query, (err, res) => {
      console.log('query returned result rows: ', res.rows)
      if (err) { cb(err, null); }
      if (res.rows) {
        let user = new User(res.rows[0]);
        cb(err, user);
      } else {
        cb(err, null);
      }
    })
  };

  validPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }

  findById(id, cb) {
    let err = null;
    let user = { id: id };
    cb(err, user)
  }

  create(user_info) {
    let { first_name, last_name, email, password } = user_info;
    //email = random_email(); // Uncomment when testing user creation so you don't have to dream up a unique eMail address every time.
    bcrypt.hash(password, saltRounds, (err, hash) => {
      let query = `
        INSERT INTO users
        (id, password, first_name, last_name, email, cash_position)
        VALUES
        ('${uuidv4()}', '${hash}', '${first_name}', '${last_name}', '${email}', 1000000)
      `;
      db.query(query, (err, res) => {
        if (err) console.log('Error while inserting a new user: ', err);
      })
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
