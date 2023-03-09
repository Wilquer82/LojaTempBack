const connection = require('../connection');

const saveUser = async ({ data }) => {
  const db = await connection();
  try {
    const existUser = await db.collection('Login')
      .findOne({ user: data.user });
    if (existUser) {
      throw new Error('Já existe um Usuário com esse nome');
    }
    await db.collection('Login').insertOne(data);
      return { success: true, message: 'Usuário salvo com sucesso' };
  } catch (error) {
    console.log(error);
    return { success: false, message: 'Erro ao salvar Usuário' };
  } finally {
    if (db) {
      db.close();
    }
  }
};



// const getProducts = async () => {
//   const db = await connection();
//   return await db.collection('Produtos').find().toArray();
// };

module.exports = {
  saveUser,
  // getProducts,
  // putProduct,
};