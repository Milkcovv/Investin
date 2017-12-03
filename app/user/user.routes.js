const user = require('./user.controller');
const express = require('express');
const router = express.Router();
const authorize = require('../app.routes').authorize;

module.exports = router;

router.get('/signup', user.signup);
router.get('/thank', user.thank);
router.get('/login', user.login);
router.post('/login', user.authenticate);
router.get('/logout', user.logout);
router.get('/dashboard', authorize, user.showDashboard);
router.get('/users', authorize,user.showAll);
router.get('/:user', user.show);
router.post('/signup', user.add);
router.post('/:user', user.update);
router.delete('/:user', user.del);