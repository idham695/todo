const route = require('express').Router();
const homeController = require('../controller/home');
const authenticated  = require('../middleware/isAuthenticated');

route.use(authenticated.isAuthenticated);
route.get('/', homeController.renderPageHome);
route.get('/:id/edit', homeController.renderPageEdit);
route.post('/:id/update', homeController.handleUpdateToDo);
route.post('/create', homeController.handleCreateTodo)
route.post('/:id/delete', homeController.handleDeleteToDo)


module.exports = route