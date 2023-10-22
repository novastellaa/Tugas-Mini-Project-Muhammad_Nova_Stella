const categoriesModel = require('../models/categoriesModel');

const menuModel = require('../models/menuModel');


// function validation
function isAlpha(str) {
    return /^[A-Za-z\s]+$/.test(str);
};

const categoriesController = {}

categoriesController.getAll = (req, res) => {
    categoriesModel.getAll((err, categories) => {
        if (err) {
            res.status(500).json({ error: 'Terjadi kesalahan dalam mengambil data menu.' });
        } else {
            res.json({ categories });
        }
    });
};

categoriesController.create = async(req, res) => {
    const { name } = req.body;
    if (!name || !isAlpha(name)) {
        return res.status(400).json({ error: 'Kolom name harus diisi dengan huruf.' });
    }

    // Lanjutkan dengan menyimpan data menu jika validasi sukses
    await menuModel.create(req.body);
    res.json({
        status: "OK",
        message: "Data berhasil ditambahkan"
    });
};

categoriesController.update = (req, res) => {
    const categoriesId = req.params.id;
    const updateCategories = req.body;

    categoriesModel.update(categoriesId, updateCategories);
    res.json({
        status: "OKE",
        message: "data berhasil di perbarui"
    });
};

categoriesController.delete = (req, res) => {
    const categoriesId = req.params.id;

    categoriesModel.delete(categoriesId);
    res.json({
        status: "OKE",
        message: "data berhasil di hapus"
    });
};
module.exports = categoriesController;
