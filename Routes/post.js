const express = require('express');
const postController = require('../Controllers/post');
const fileuploader = require('../MiddleWare/UploadFiles');
const route = express.Router();

route.get('/', postController.GetAll);

route.get('/:id', postController.FindById);

route.patch('/:id', postController.updatepost);

route.delete('/:id', postController.Delete);

route.post('/add', fileuploader.single('image'), postController.Ajouter);

module.exports = route