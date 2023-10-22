const db = require("../../db/config");
const orderModel = require('../models/orderModel')
const menuModel = {};

menuModel.getAll = (callback) => {
    db.all("SELECT * FROM menu", (err, rows) => {
        if (err) {
            console.error('Terjadi kesalahan:', err);
            callback(err, null);
        } else {
            console.log('Data berhasil diterima:', rows);
            callback(null, rows);
        }
    });
};

menuModel.create = (data, callback) => {
    db.run(
        "INSERT INTO menu (item, price) VALUES (?, ?)", [data.item, data.price],
        (err) => {
            if (err) {
                callback(err, null);
            } else {
                const insertedMenuId = this.lastID;
                db.get(
                    "SELECT * FROM menu WHERE id = ?", [insertedMenuId]
                );
            }
        }
    );
};

menuModel.update = (data, callback) => {
    db.run(
        `UPDATE menu SET item = "ayam bekakak", price = 15000 WHERE id = 10`, [data.item, data.price, data.id], //  jika ingin melakukan perubahan inputan lewat query
        (err) => {
            if (err) {
                callback(err);
            } else {
                console.log({ message: "Menu item updated successfully" });
            }
        }
    );
};

menuModel.delete = (id, callback) => {
    db.run(
        `DELETE FROM menu WHERE id = ?`, [7], // untuk menghapus masukkan id ke array
        (err) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, { message: "Menu item deleted successfully" });
            }
        }
    );
};

menuModel.select = (menuNames, callback) => {
    const placeholders = menuNames.map(() => '?').join(',');
    const query = `SELECT * FROM menu WHERE item IN (${placeholders})`;

    db.all(query, menuNames, (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
};


module.exports = menuModel;
