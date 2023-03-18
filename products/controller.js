const Product = require('./model.js');

exports.saveProduct = async (req, res) => {
  try {
    const newProduct = await Product.saveProduct(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    return { success: false, message: 'Erro ao salvar produto' };
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.getProducts();
    return res.json(products);
  } catch (err) {
    // res.status(500).json({ message: err.message });
  }
};

exports.putProduct = async (data) => {
  try {
    const products = await Product.putProduct(data);
    return res.json(products);
  } catch (err) {
    // res.status(500).json({ message: err.message });
  }
};

exports.delProduct = async (data) => {
  try {
    const products = await Product.delProduct(data.params.product);
    return res.json(products);
  } catch (err) {
    // res.status(500).json({ message: err.message });
  }
};