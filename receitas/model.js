const connection = require('../connection');


const saveRecipe = async (data) => {
  // console.log(data, "MODEL")
  const db = await connection();
  try {
    // const existingRecipe = await db.collection('Receitas')
    //   .findOne({ Label: data.Label });
    // if (existingRecipe) {
    //   throw new Error('Já existe essa Receita!');
    // }
    await db.collection('Receitas').insertOne(data);
      return { success: true, message: 'Cliente salvo com sucesso' };
  } catch (error) {
    console.log(error);
    return { success: false, message: 'Erro ao salvar Cliente' };
  }
};

module.exports = {
  saveRecipe,
}