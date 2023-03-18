const connection = require('../connection');

const saveMoviment = async ({ data }) => {
  const db = await connection();
  try {
    await db.collection('Movimento').insertOne(data);
      return { success: true, message: 'Produto salvo com sucesso' };
  } catch (error) {
    console.log(error);
    return { success: false, message: 'Erro ao salvar produto' };
  } finally {
    if (db) {
      db.close();
    }
  }
};

const getMoviment = async () => {
  const db = await connection();
  return await db.collection('Movimento').find().toArray();
};

module.exports = {
  saveMoviment,
  getMoviment,
};