const connection = require('../connection');

const saveClient = async ({ data }) => {
  console.log(data, "model");
  const db = await connection();
  try {
    const existingClient = await db.collection('Clientes')
      .findOne({ Client: data.nome });
    if (existingClient) {
      throw new Error('Já existe esse Cliente!');
    }
    await db.collection('Clientes').insertOne(data);
      return { success: true, message: 'Cliente salvo com sucesso' };
  } catch (error) {
    console.log(error);
    return { success: false, message: 'Erro ao salvar Cliente' };
  } finally {
    if (db) {
      db.close();
    }
  }
};

const getClients = async () => {
  const db = await connection();
  return await db.collection('Clientes').find().toArray();
};

module.exports = {
  saveClient,
  getClients,
};