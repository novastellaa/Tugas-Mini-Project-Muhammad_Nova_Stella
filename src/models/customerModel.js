const db = require("../../db/config");

const customerModel = {}

// method menampilkan semua data
customerModel.getAll = (callback) => {
    db.all("SELECT * FROM customer", (err, customer) => {
        if (err) {
            console.error('Terjadi kesalahan:', err);
            callback(err, null); // Panggil callback dengan kesalahan jika terjadi kesalahan
        } else {
            console.log('Data berhasil diterima:', customer);
            callback(null, customer); // Panggil callback dengan data jika berhasil
        }
    });
};

// method membuat data customer. untuk memasukkan data kita input kedalam body nya
customerModel.create = (data, callback) => {
    db.run(
        `INSERT INTO customer (name, address, email) VALUES (?, ?, ?)`, [data.name, data.address, data.email],
        (err) => {
            if (err) {
                throw err;
            } else {
                const insertedCustomerId = this.lastID;
                db.get(
                    "SELECT * FROM customer WHERE id = ?", [insertedCustomerId],
                    function(err, row) {
                        if (err) {
                            callback(err, null);
                        } else {
                            callback(null, row);
                        }
                    }
                );
            }
        }
    );
};

// method merubah data customer. untuk memasukkan data kita input kedalam body nya
customerModel.update = (customerId, updatedCustomer, callback) => {
    const { name, address, email } = updatedCustomer;
    db.run(
        "UPDATE customer SET name = ?, address = ?, email = ? WHERE id = ?", [name, address, email, customerId],
        (err) => {
            if (err) {
                console.error('Terjadi kesalahan dalam query UPDATE:', err);
                callback(err, null);
            } else {
                db.get(
                    "SELECT * FROM customer WHERE id = ?", [customerId],
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

// method menghapus data customer
customerModel.delete = (id) => {
    return db.run(
        `DELETE FROM customer WHERE id = ?`, [2], // ubah index untuk menghapus index ke berapa
        (err) => {
            if (err) {
                throw err;
            }
        }
    );
};

// get by name
customerModel.getByName = (id, callback) => {
    db.get('SELECT * FROM customer WHERE id = ?', [id], (err, row) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, row);
        }
    });
};

customerModel.getById = (id) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM customer WHERE id = ?";
        db.get(query, [id], (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}


module.exports = customerModel;
