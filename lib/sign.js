const query = require('./mysql');
exports.insertUser = ({username, password}) => {
  let sql = `insert into user_info (username, password) values ('${username}', '${password}')`;
  return query(sql);
}

exports.searchUser = ({username}) => {
  let sql =  `select * from user_info where username='${username}'`;
  return query(sql);
}