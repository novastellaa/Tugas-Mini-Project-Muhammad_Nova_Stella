 const categoriesModel = require("../models/categoriesModels");


 function isAlpha(str) {
     return /^[A-Za-z\s]+$/.test(str);
 }

 const categoriesControllers = {};

 categoriesControllers.getAll = async(req, res) => {
     const data = await categoriesModel.getAll();
     res.json({
         data
     })
 }

 categoriesControllers.create = async(req, res) => {
     const { name } = req.body;
     if (!item || !isAlpha(name)) {
         return res.status(400).json({ error: 'Kolom name harus diisi dengan huruf.' });
     }

     // Lanjutkan dengan menyimpan data menu jika validasi sukses
     await menuModel.create(req.body);
     res.json({
         status: "OK",
         message: "Data berhasil ditambahkan"
     });
 };

 categoriesControllers.getById = async(req, res) => {
     const { id } = req.params;
     const data = await categoriesModel.getCategoriesById(id);
     res.json({
         data
     })
 }

 categoriesControllers.updateCategories = async(req, res) => {
     const { id } = req.params;
     const { name } = req.body;
     await categoriesModel.update(id, name);
     res.json({
         message: `data dengan id ${id} berhasil di update`
     })
 }


 categoriesControllers.deleteById = async(req, res) => {
     const { id } = req.params;

     await categoriesModel.deleteCategoriesById(id);

     res.json({
         message: `categories dengan id ${id} berhasil di hapus`
     })
 }


 module.exports = categoriesControllers
