const signSql = require('../lib/sign');
const md5 = require('md5');
const jwt = require('jsonwebtoken');

exports.postSignUp = async ctx => {
  const { username, password = '' } = ctx.request.body;
  await signSql.searchUser({ username }).then(async res => {
    if (res.length > 0) {
      ctx.body = {
        code: 500,
        status: 'error',
        message: '用户已存在'
      }
    } else {
      await signSql.insertUser({ username, password: md5(password) }).then(res => {
        ctx.body = {
          code: 200,
          status: 'success',
          message: '注册成功',
        }
      })
    }
  })
}

exports.postSignIn = async ctx => {
  const { username, password } = ctx.request.body;
  await signSql.searchUser({ username, password: md5(password) }).then(res => {
    if (res.length > 0 && username === res[0]['username']) {
      if (md5(password) !== res[0]['password']) {
        ctx.body = {
          code: 500,
          status: 'error',
          message: '密码错误'
        }
      } else {
        const token = jwt.sign({
          username: res[0].username,
          id: res[0].id,
        }, 'pro_token', { expiresIn: '2h' });
        ctx.body = {
          code: 200,
          status: 'success',
          token,
          message: '登陆成功',
        }
      }
    } else {
      ctx.body = {
        code: 500,
        status: 'error',
        message: '用户不存在',
      }
    }
  })
}