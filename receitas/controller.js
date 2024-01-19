const Recipe = require('./model.js');

exports.saveRecipe = async (req, res) => {
  // console.log(req.body, 'controller');
  try {
    const newRecipe = await Recipe.saveRecipe(req.body);
    res.status(201).json(newRecipe);
  } catch (err) {
    return { success: false, message: 'Erro ao salvar Cliente!' };
  }
};