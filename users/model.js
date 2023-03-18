const bcrypt = require('bcrypt');
const connection = require('../connection');


const saveUser = async ({ data }) => {
  const db = await connection();
  try {
    const existUser = await db.collection('Login')
      .findOne({ user: data.user });
    if (existUser) {
      throw new Error('Já existe um Usuário com esse nome');
    }

    const password = data.password;

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
    data.password = hashedPassword;
    
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


module.exports = {
  saveUser,

};