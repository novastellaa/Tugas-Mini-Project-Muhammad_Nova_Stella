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
categoriesModel.update = (categoriesId, updatedCategories, callback) => {
    const { name } = updatedCategories;
    db.run(
        "UPDATE categories SET name = ? WHERE id = ?", [name, categoriesId],
        (err) => {
            if (err) {
                console.error('Terjadi kesalahan dalam query UPDATE:', err);
                callback(err, null);
            } else {
                db.get(
                    "SELECT * FROM categories WHERE id = ?", [categoriesId],
                    (err, updatedData) => {
                        if (err) {
                            console.error('Terjadi kesalahan dalam query SELECT setelah UPDATE:', err);
                            callback(err, null);
                        } else {
                            callback(null, updatedData);
                        }
                    }
                );
            }
        }
    );
};

// method merubah data categories.
categoriesModel.delete = (id) => {
    return db.run(
        `DELETE FROM categories WHERE id = ?`, [1], // kalo mau hapus ganti index id-nya
        (err) => {
            if (err) {
                throw err;
            }
        }
    );
};

module.exports = categoriesModel;
