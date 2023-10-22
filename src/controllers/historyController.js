const historyModel = require("../models/historyModel");
const customerModel = require("../models/customerModel");

const historyController = {};

historyController.getOrdersByCustomer = (req, res) => {
    const { customerId } = req.params;

    // Validasi data pelanggan
    customerModel.getById(customerId, (err, customer) => {
        if (err) {
            return res.status(500).json({ status: 'ERROR', message: 'Terjadi kesalahan dalam mengambil data pelanggan.' });
        }
        if (!customer) {
            return res.status(404).json({ status: 'ERROR', message: 'Pelanggan tidak ditemukan.' });
        }

        // Ambil history pemesanan customer
        historyModel.getOrdersByCustomer(customerId, (err, orders) => {
            if (err) {
                return res.status(500).json({ status: 'ERROR', message: 'Terjadi kesalahan dalam mengambil data pemesanan.' });
            }

            // Transformasi data respons sesuai format yang diinginkan
            const formattedOrders = orders.map((order) => ({
                menu: order.menu,
                price: order.price,
                qty: order.qty,
            }));

            // Hitung total pesanan
            const totalOrder = formattedOrders.reduce((total, order) => {
                return total + order.price * order.qty;
            }, 0);

            // Buat respons sesuai format
            const response = {
                status: 'OK',
                data: [{
                    customerName: customer.customerName,
                    orders: formattedOrders,
                    totalOrder: totalOrder,
                    orderDate: new Date().toISOString().split('T')[0],
                }, ],
            };

            res.status(200).json(response);
        });
    });
};

module.exports = historyController;
