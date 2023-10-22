const express = require("express");
const menuController = require("../controllers/menuController"); // Pastikan controller sudah diimpor dengan benar
const customerController = require('../controllers/customerController');
const categoriesController = require('../controllers/categoriesController');
const orderController = require('../controllers/orderController');
const router = express.Router();

//router menu
router.get('/menus', menuController.getAll); // Mendapatkan semua menu
router.post('/menus', menuController.create); // Menambahkan menu baru
router.put('/menus/:id', menuController.update); // Mengupdate menu berdasarkan ID
router.delete('/menus/:id', menuController.delete); // Menghapus menu berdasarkan ID


// router customer
router.get('/customers', customerController.getAll); // Mendapatkan semua pelanggan
router.post('/customers', customerController.create); // Menambahkan pelanggan baru
router.put('/customers/:id', customerController.update); // Mengupdate pelanggan berdasarkan ID
router.delete('/customers/:id', customerController.delete); // Menghapus pelanggan berdasarkan ID
router.get('/customers/:id', customerController.getByName);

// router categories
router.get('/categories', categoriesController.getAll); // Mendapatkan semua kategori
router.post('/categories', categoriesController.create); // Menambahkan kategori baru
router.put('/categories/:id', categoriesController.update); // Mengupdate kategori berdasarkan ID
router.delete('/categories/:id', categoriesController.delete); // Menghapus kategori berdasarkan ID

// router order
router.post('/orders', orderController.create);
router.get('/orders', orderController.getAll);

module.exports = router;
