const ObjectId = require('mongodb').ObjectID;
const DB = require('./Mongo');

const productsAPI = {
    getProducts: async function (req, res) {
        DB.dbo.collection("products").find({}).toArray(function (err, result) {
            if (err) return res.status(500).send({ message: 'Error', data: err });
            return res.status(200).send({ message: 'products', data: result });
        });
    },
}

module.exports = productsAPI;