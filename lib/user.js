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
}

let user = new User();

module.exports.findOne = user.findOne;
module.exports.validPassword = user.validPassword;
