const orderModels = require("../models/orderModels");
const customerModel = require("../models/customerModel")
const menuModel = require("../models/menuModel")
const orderController = {};

orderController.getAll = (req, res) => {
    const data = orderModels.getAll((err, rows) => {
        if (err) {
            res.status(500).json({
                "Status": "ERROR",
                "data": err
            })
        } else {
            res.status(500).json({
                "Status": "SUCCESS",
                "data": rows
            })
        }
    })
}

orderController.create = async(req, res) => {
    const { customerId, items } = req.body;

    // Validasi data pelanggan
    customerModel.getByName(customerId, async(err, customer) => {
        if (err) {
            return res.status(500).json({ error: 'Terjadi kesalahan dalam mengambil data pelanggan.' });
        }
        if (!customer) {
            return res.status(404).json({ message: 'Pelanggan tidak ditemukan.' });
        }

        const menuName = items.map((d) => d.menu);
        const mappedMenu = items.map((f) => ({
            menuName: f.menu.split(" ").join(""),
            qty: f.qty,
        }));
        const groupByMenuName = mappedMenu.reduce((result, item) => {
            if (!result[item.menuName]) {
                result[item.menuName] = [];
            }
            result[item.menuName].push(item);
            return result;
        }, {});

        const findMenu = new Promise((resolve, reject) => {
            menuModel.select(menuName, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
        const menus = await findMenu;

        // Siapkan respons sesuai format yang diinginkan
        const response = {
            status: 'OK',
            message: 'Data Berhasil Ditambahkan!',
            orders: [],
            totalOrder: 0,
            orderDate: new Date().toISOString().split('T')[0],
        };

        for (let data of menus) {
            const menuName = data.item.split(" ").join("");
            const orderQty = groupByMenuName[menuName][0].qty;
            const orderPrice = data.price;

            // Tambahkan detail pesanan ke respons
            response.orders.push({
                menu: data.item,
                price: orderPrice,
                qty: orderQty,
            });

            // Hitung total pesanan
            response.totalOrder += orderPrice * orderQty;

            // Tambahkan pesanan ke database
            const insertOrder = {
                customerId: customerId,
                menuId: data.id,
                qty: orderQty,
            };
            orderModels.create(insertOrder, (err, rows) => {
                if (err) {
                    console.log(rows);
                } else {
                    console.log(rows);
                }
            });
        }

        res.status(201).json(response);
    });
};

module.exports = orderController;
