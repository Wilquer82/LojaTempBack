
const Product = require('./model.js'); 

// controlador para criar um novo produto
exports.saveProduct = async (req, res) => {
  try {
    // const { product, measure, price, quantity } = req.body;
    const newProduct = await Product.saveProduct(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    // res.status(500).json({ message: err.message });
  }
};

// controlador para listar todos os produtos
exports.getProducts = async (req, res) => {
  console.log("entrou no controller")
  try {
    const products = await Product.getProducts();
    console.log(products)
    res.json(products);
  } catch (err) {
    // res.status(500).json({ message: err.message });
  }
};

// exports.findOneProduct = async (req, res) => {
//   console.log(req.params.product, "controller")
//   try {
//     const result = await Product.findOneProduct(req.params.product);
//     return result;
//   } catch (error) {
//     console.log(error);
//   }
// };

// module.exports = {
//   saveProduct,
//   getProducts,
// };