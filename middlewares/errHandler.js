async function errHandler(ctx, next) {
  return next().catch(err => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        code: 401,
        message: '登陆过期,请重新登录',
      };
    } else {
      throw err;
    }
  })
}

module.exports = errHandler;
