const menuModel = require("../models/menuModel")


function isAlpha(str) {
    return /^[A-Za-z\s]+$/.test(str);
}

function isNumeric(str) {
    return /^\d+$/.test(str);
}

const menuController = {}

menuController.getAll = async(req, res) => {
    const menus = await menuModel.getAll()
    res.json({
        status: "OK",
        message: menus
    })
}

menuController.create = async(req, res) => {
    const { item, price } = req.body;

    // Validasi kolom item
    if (!item || !isAlpha(item)) {
        return res.status(400).json({ error: 'Kolom item harus diisi dengan huruf.' });
    }

    // Validasi kolom price
    if (!price || !isNumeric(price)) {
        return res.status(400).json({ error: 'Kolom price harus diisi dengan angka.' });
    }

    // Lanjutkan dengan menyimpan data menu jika validasi sukses
    await menuModel.create(req.body);
    res.json({
        status: "OK",
        message: "Data berhasil ditambahkan"
    });
};

menuController.getById = async(req, res) => {
    const id = req.params.id
    const data = await menuModel.getById(id);

    res.json({
        data
    })
}

menuController.updateData = async(req, res) => {
    const { id } = req.params
    const { item, price } = req.body;
    await menuModel.update(id, item, price)

    res.json({
        status: "OK",
        message: "data berhasil di perbarui"
    })
}

menuController.deleteData = async(req, res) => {
    const { id } = req.params
    await menuModel.delete(id);

    res.json({
        status: "OK",
        message: `data berhasil dihapus`,
        data
    })

}

menuController.getById = async(req, res) => {
    const id = req.params.id
    const data = await menuModel.getById(id);

    res.json({
        data
    })
}

menuController.select = (req, res) => {
    const { menuNames } = req.body; // Anda mungkin perlu menyesuaikan ini dengan bagaimana Anda ingin mengirimkan menuNames

    menuModel.select(menuNames, (err, menuData) => {
        if (err) {
            return res.status(500).json({ error: 'Terjadi kesalahan dalam mengambil data menu.' });
        }

        // Anda dapat melakukan apa pun dengan menuData di sini, misalnya mengirimkannya sebagai respons
        res.json({
            status: 'OK',
            menuData,
        });
    });
};
module.exports = menuController;
