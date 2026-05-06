const db = require('../config/db');

exports.createUser = (data, callback) => {
  const { username, password, role } = data;
  db.query(
    'INSERT INTO users (username,password,role) VALUES (?,?,?)',
    [username, password, role],
    callback
  );
};

exports.findUserByUsername = (username, callback) => {
  db.query(
    'SELECT * FROM users WHERE username=?',
    [username],
    callback
  );
};