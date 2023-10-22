const customerModel = require("../models/customerModel");


// functiom validasi
function isAlpha(str) {
    return /^[A-Za-z\s]+$/.test(str);
}

const customerController = {}

customerController.getAll = (req, res) => {
    customerModel.getAll((err, customer) => {
        if (err) {
            res.status(500).json({ error: 'Terjadi kesalahan dalam mengambil data menu.' });
        } else {
            res.json({ customer });
        }
    });
};

// Metode create untuk customer
customerController.create = async(req, res) => {
    const { name, address, email } = req.body;
    if (!name || !isAlpha(name)) {
        return res.status(400).json({ error: 'Kolom name harus diisi dengan huruf.' });
    }

    // Validasi kolom price
    if (!address || !isAlpha(address)) {
        return res.status(400).json({ error: 'Kolom address harus diisi dengan huruf.' });
    }

    if (!email || !isAlpha(email)) {
        return res.status(400).json({ error: 'Kolom email harus diisi dengan huruf.' });
    }

    // Lanjutkan dengan menyimpan data menu jika validasi sukses
    await customerModel.create(req.body);
    res.json({
        status: "OK",
        message: "Data berhasil ditambahkan"
    });
};

// Metode update untuk customer
customerController.update = (req, res) => {
    const customerId = req.params.id;
    const updatedCustomer = req.body;

    customerModel.update(customerId, updatedCustomer, (err, updatedData) => {
        if (err) {
            res.status(500).json({ error: 'Terjadi kesalahan dalam mengupdate data pelanggan.' });
        } else {
            res.json({
                status: "OKE",
                message: "data berhasil di perbarui"
            });
        }
    });
};

// Metode delete untuk customer
customerController.delete = (req, res) => {
    const customerId = req.params.id;

    customerModel.delete(customerId);
    res.json({
        status: "OKE",
        message: "data berhasil di hapus"
    });
};


// 
customerController.getByName = (req, res) => {
    const customerId = req.params.id; // Mengambil customerId dari parameter permintaan

    customerModel.getByName(customerId, (err, customer) => {
        if (err) {
            return res.status(500).json({ error: 'Terjadi kesalahan dalam mengambil data pelanggan.' });
        }

        if (!customer) {
            return res.status(404).json({ message: 'Pelanggan tidak ditemukan.' });
        }

        res.json({ customer });
    });
};

customerController.getById = async(req, res) => {
    const { id } = req.params;
    const data = await customerModel.getById(id);
    res.json({
        message: `ini adalah data dengan id ${id}`,
        data
    })
}

module.exports = customerController;
