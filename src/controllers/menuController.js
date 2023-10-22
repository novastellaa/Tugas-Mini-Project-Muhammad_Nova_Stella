const menuModel = require("../models/menuModel")
const fs = require('fs')

// function validasi
function isAlpha(str) {
    return /^[A-Za-z\s]+$/.test(str);
}


const menuController = {}


menuController.getAll = (req, res) => {
    menuModel.getAll((err, menus) => {
        if (err) {
            res.status(500).json({ error: 'Terjadi kesalahan dalam mengambil data menu.' });
        } else {
            res.json({ menus });
        }
    });
};

// silahkan buat varian controller lain sesuai fitur masing masing
// Metode create untuk menu
menuController.create = async(req, res) => {
    const { item, price } = req.body;
    if (!item || !isAlpha(item)) {
        return res.status(400).json({ error: 'Kolom item harus diisi dengan huruf.' });
    }

    // Validasi kolom price
    if (typeof price !== "number") {
        return res.status(400).json({ error: 'Kolom price harus diisi dengan angka.' });
    }

    // Lanjutkan dengan menyimpan data menu jika validasi sukses
    await menuModel.create(req.body);
    res.json({
        status: "OK",
        message: "Data berhasil ditambahkan"
    });
};


// Metode update untuk menu
menuController.update = (req, res) => {
    const menuId = req.params.id;
    const updatedMenu = req.body;

    menuModel.update(menuId, updatedMenu);
    res.json({
        status: "OK",
        message: "data berhasil di perbarui"
    })
};

// Metode delete untuk menu
menuController.delete = (req, res) => {
    const { id } = req.params;
    menuModel.delete(id, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Terjadi kesalahan dalam penghapusan menu.' });
        } else {
            res.json({
                status: "OKE",
                message: "data berhasil di hapus"
            });
        }
    });
};

menuController.select = (req, res) => {
    const { menuNames } = req.body;

    // Validasi data yang diterima
    if (!menuNames || !Array.isArray(menuNames) || menuNames.length === 0) {
        return res.status(400).json({ error: 'Data menu tidak valid' });
    }

    // Panggil fungsi menuModel.select untuk mengambil data menu
    menuModel.select(menuNames, (err, menuData) => {
        if (err) {
            console.error('Terjadi kesalahan:', err);
            return res.status(500).json({ error: 'Terjadi kesalahan dalam mengambil data menu.' });
        }

        if (menuData.length === 0) {
            return res.status(404).json({ message: 'Data menu tidak ditemukan.' });
        }

        // Jika data berhasil ditemukan, kirim respons dengan data menu
        res.json({ menuData });
    });
};




module.exports = menuController;
