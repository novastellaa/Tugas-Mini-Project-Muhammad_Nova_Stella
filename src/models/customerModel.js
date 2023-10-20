const db = require("../../db/config")


const customerModel = {};


//Get all data in Customer Tabel
//query = SELECT * FROM customer;
customerModel.getAll = () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM customer";
        db.all(query, (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })

    })
}


//Get Customer by1
//query = SELECT * FROM customer WHERE id = ?
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


//Create new customer
//query = INSERT INTO customer(name, addres, email) VALUES (?,?,?)
customerModel.create = (name, address, email) => {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO customer(name, address, email) VALUES (?,?,?)";
        db.run(query, [name, address, email], (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}

//update data by Id
//query = UPDATE customer SET name = ? addres = ? email = ? WHERE id = ?
customerModel.updateById = (name, address, email, id) => {
    return new Promise((resolve, reject) => {
        const query = "UPDATE customer SET name=?,address=? ,email=?  where id =? ";
        db.run(query, [name, address, email, id], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

//delete data by Id
//query = DELETE FROM customer WHERE id = ?
customerModel.deleteById = (id) => {
    return new Promise((resolve, reject) => {
        const query = "DELETE FROM customer WHERE id = ?";
        db.run(query, [id], (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}

customerModel.clearAllDataTable = () => {
    return new Promise((resolve, reject) => {
        const query = "DELETE FROM customer";
        db.run(query, (err) => {
            if (err) {
                reject(err)
            } else {
                const queryResetID = "UPDATE sqlite_sequence SET seq = 0 WHERE name = 'customer'";
                db.run(queryResetID, (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve("data berhasil di hapus, dan ID berhasil direset")
                    }
                })
            }
        })
    })
}

customerModel.getByName = (customerId, callback) => {
    db.get('SELECT * FROM customer WHERE id = ?', [customerId], (err, row) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, row);
        }
    });
};

module.exports = customerModel;
