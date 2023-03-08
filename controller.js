const Product = require('./model.js');


// controlador para criar um novo produto
exports.saveProduct = async (req, res) => {
  try {
    const newProduct = await Product.saveProduct(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    return { success: false, message: 'Erro ao salvar produto' };
  }
};

// controlador para listar todos os produtos
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.getProducts();
    return res.json(products);
  } catch (err) {
    // res.status(500).json({ message: err.message });
  }
};

// controlador para alterar um produto
exports.putProduct = async (req, res) => {
  console.log("entrou no controller");
  console.log(req)
  try {
    const products = await Product.putProduct(req);
    console.log(products);
    return res.json(products);
  } catch (err) {
    // res.status(500).json({ message: err.message });
  }
};