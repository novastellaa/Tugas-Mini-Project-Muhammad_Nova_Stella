const db = require("../../db/config")

const menuModel = {}


menuModel.getAll = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM menu", (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })

}

menuModel.create = (data) => {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO menu (item,price) VALUES ('${data.item}', '${data.price}')`, (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}

menuModel.getById = (id) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM menu WHERE id = ?", [id], (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}

menuModel.update = (id, item, price) => {
    return new Promise((resolve, reject) => {
        db.run("UPDATE menu SET item = ?, price = ? WHERE id = ?", [item, price, id], (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })

    })
}

menuModel.delete = (id) => {
    return new Promise((resolve, reject) => [
        db.run("DELETE FROM menu WHERE id = ?", [id], (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    ])
}

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



module.exports = menuModel
