const bcrypt = require('bcryptjs');

const password = '123456Aa';
bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log('Hashed password:', hash);

    bcrypt.compare(password, hash, (err, isMatch) => {
      console.log('Do they match?:', isMatch);
    });
  });
});