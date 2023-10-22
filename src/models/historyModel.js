const db = require("../../db/config");

const historyModel = {};

historyModel.getOrdersByCustomer = (customerId, callback) => {
    db.all("SELECT c.name AS customerName, m.item AS menu, m.price, o.qty, o.order_date FROM orders AS o JOIN customer AS c ON c.id = o.customer_id JOIN menu AS m ON m.id = o.menu_id WHERE c.id = ?", [customerId], (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
};

module.exports = historyModel;
