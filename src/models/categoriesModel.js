const db = require('../../db/config');

const categoriesModel = {}

// method memanggil semua data categories.
categoriesModel.getAll = (callback) => {
    db.all("SELECT * FROM categories", (err, rows) => {
        if (err) {
            console.error('Terjadi kesalahan:', err);
            callback(err, null); // Panggil callback dengan kesalahan jika terjadi kesalahan
        } else {
            console.log('Data berhasil diterima:', rows);
            callback(null, rows); // Panggil callback dengan data jika berhasil
        }
    });
};

// // method membuat data categories.
categoriesModel.create = (data, callback) => {
    db.run(
        "INSERT INTO categories (name) VALUES (?)", [data.name], // kalo mau nambahin ganti query insertnya lewat body
        (err) => {
            if (err) {
                throw err;
            }
        }
    );
};

// method merubah data categories.
categoriesModel.update = (data, callback) => {
    return db.run(
        `UPDATE categories SET name = 'minuman' WHERE id = 2`, [data.name], // kalo mau di update ganti query insert nya aja sesuain yang (?)
        (err) => {
            if (err) {
                throw err;
            }
        }
    );
};

// method merubah data categories.
categoriesModel.delete = (id) => {
    return db.run(
        `DELETE FROM categories WHERE id = ?`, [3], // kalo mau hapus ganti index id-nya
        (err) => {
            if (err) {
                throw err;
            }
        }
    );
};

module.exports = categoriesModel;
