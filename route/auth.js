const route = require('express').Router();
const authController = require('../controller/auth');


route.get('/daftar', authController.renderPageDaftar);

route.get('/masuk', authController.renderPageMasuk);

route.post('/signup', authController.handleSignUp);

route.post('/signin', authController.handleSignIn);

route.get('/logout', authController.logout);

module.exports = route
