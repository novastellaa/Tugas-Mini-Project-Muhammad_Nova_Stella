const db = require("../../db/config")


const orderModels = {};

orderModels.getAll = (callback) => {
    db.all('SELECT * FROM orders JOIN menu ON menu.id = orders.menu_id JOIN customer ON customer.id = orders.customer_id', (err, rows) => {
        if (err) {
            callback(err, null)
        } else {
            callback(null, rows)
        }
    });
}

orderModels.create = (data, callback) => {
    const currentDate = new Date().toISOString().split('T')[0]; // Mendapatkan tanggal saat ini
    db.run(
        `INSERT INTO orders (customer_id, menu_id, qty, order_date) VALUES (?, ?, ?, ?)`, [data.customerId, data.menuId, data.qty, currentDate],
        (err, rows) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, rows);
            }
        }
    );
};



module.exports = orderModels
