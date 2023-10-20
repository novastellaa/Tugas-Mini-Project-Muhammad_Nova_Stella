const customerModel = require("../models/customerModel");

function isAlpha(str) {
    return /^[A-Za-z\s]+$/.test(str);
}


const customerControllers = {};

customerControllers.getAll = async(req, res) => {
    const data = await customerModel.getAll();
    res.json({
        status: "OK",
        data
    })
}


customerControllers.create = async(req, res) => {
    const { name, address, email } = req.body;

    // Validasi kolom item
    if (!item || !isAlpha(name)) {
        return res.status(400).json({ error: 'Kolom name harus diisi dengan huruf.' });
    }
    if (!item || !isAlpha(address)) {
        return res.status(400).json({ error: 'Kolom address harus diisi dengan huruf.' });
    }
    if (!item || !isAlpha(email)) {
        return res.status(400).json({ error: 'Kolom email harus diisi dengan huruf.' });
    }
    // Lanjutkan dengan menyimpan data menu jika validasi sukses
    await menuModel.create(req.body);
    res.json({
        status: "OK",
        message: "Data berhasil ditambahkan"
    });
};

customerControllers.getById = async(req, res) => {
    const { id } = req.params;
    const data = await customerModel.getById(id);
    res.json({
        message: `ini adalah data dengan id ${id}`,
        data
    })
}

customerControllers.update = async(req, res) => {
    const { id } = req.params;
    const { name, address, email } = req.body;

    await customerModel.updateById(name, address, email, id);

    res.json({
        status: "OK",
        message: "data berhasil diperbarui"
    })
}


customerControllers.delete = async(req, res) => {
    const { id } = req.params;

    await customerModel.deleteById(id);

    res.json({
        status: "OK",
        message: "data berhasil dihapus"
    })
}

customerControllers.clearAllData = async(req, res) => {
    await customerModel.clearAllDataTable()
    res.json({
        status: "OK",
        message: "semua data berhasil di hapus"
    })
}




module.exports = customerControllers
