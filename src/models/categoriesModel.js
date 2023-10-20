const db = require("../../db/config");

const categoriesModel = {};

categoriesModel.getAll = () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM categories";
        db.all(query, (err, rows) => {
            if(err){
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}

categoriesModel.create = (name) => {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO categories(name) VALUES (?)";
        db.run(query, [name], (err, rows) => {
            if(err){
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}

categoriesModel.getCategoriesById = (id) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM categories WHERE id = ?";
        db.get(query, [id],  (err, rows) => {
            if(err){
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}


categoriesModel.update = (id, name) => {
    return new Promise((resolve, reject) => {
        const query = "UPDATE categories SET name = ? WHERE id = ?";
        db.run(query, [name, id],(err) => {
            if(err) {
                reject(err)
            } else {
                resolve("data berhasil di update")
            }
        })
    })
}


categoriesModel.deleteCategoriesById = (id) => {
    new Promise((resolve,reject) => {
        const query = "DELETE FROM categories WHERE id = ?"
        db.run(query, [id], (err) => {
            if(err){
                reject(err)
            } else {
                resolve(`categories dengan id ${id} berhasil terhapus`)
            }
        })
    })
}


module.exports = categoriesModel;
