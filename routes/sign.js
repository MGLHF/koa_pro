const router = require('koa-router')();
const controller = require('../controller/c-sign');

router.prefix('/tb1/api');
// 注册接口
router.post('/signup', controller.postSignUp);

// 登陆接口
router.post('/signin', controller.postSignIn);
module.exports = router;