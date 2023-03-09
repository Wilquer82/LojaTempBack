const User = require('./model.js');

exports.saveUser = async (req, res) => {
  try {
    console.log(req.body);
    const newUser = await User.saveUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    return { success: false, message: 'Erro ao salvar Usuário!' };
  }
};

// // controlador para listar todos os produtos
// exports.getProducts = async (req, res) => {
//   try {
//     const products = await Product.getProducts();
//     return res.json(products);
//   } catch (err) {
//     // res.status(500).json({ message: err.message });
//   }
// };

