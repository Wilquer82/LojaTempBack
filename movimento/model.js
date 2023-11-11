const connection = require('../connection');

const saveMoviment = async ( data ) => {
  const db = await connection();
  try {
    await db.collection('FluxoCaixa').insertOne(data);
      return { success: true, message: 'Produto salvo com sucesso' };
  } catch (error) {
    console.log(error);
    return { success: false, message: 'Erro ao salvar produto' };
  } 
};

const getMoviment = async () => {
  const db = await connection();
  const data = await db.collection('FluxoCaixa').find().toArray();
  return data
};

module.exports = {
  saveMoviment,
  getMoviment,
};