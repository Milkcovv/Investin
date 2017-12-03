const post = require('./post.controller');
const express = require('express');
const router = express.Router();
const authorize = require('../app.routes').authorize;

module.exports = router;

router.get('/', post.index);
router.all('/api/*', authorize);
router.get('/api/posts', post.getPosts);
router.put('/api/posts', post.updateAll);
router.delete('/api/posts', post.deleteAll)
router.post('/api/posts', post.create);
router.get('/api/posts/:id', post.getPost)
router.put('/api/posts/:id', post.update);
router.delete('/api/posts/:id', post.del);
