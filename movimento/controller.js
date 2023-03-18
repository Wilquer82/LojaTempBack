const Moviment = require('./model.js');

exports.saveMoviment = async (req, res) => {
  try {
    const newProduct = await Moviment.saveMoviment(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    return { success: false, message: 'Erro ao salvar produto' };
  }
};


exports.getMoviment = async (req, res) => {
  try {
    const products = await Moviment.getMoviment();
    return res.json(products);
  } catch (err) {
    // res.status(500).json({ message: err.message });
  }
};

