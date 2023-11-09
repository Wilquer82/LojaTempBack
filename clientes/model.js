const connection = require('../connection');

const saveClient = async ({ data }) => {
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

const delClient = async (data) => {  
  const db = await connection();
  try {
    await db.collection('Clientes').deleteOne({ 'nome': data });
  } catch (error) {
    console.log(error);
  }
  if (db) {
    db.close();
  }
};

const putClient = async (data) => {  
  const db = await connection();

  try {
    const existingClient = await db.collection('Clientes').findOne({ nome: data.nome });
    const filter = { nome : data.nome}
    const updatedClient = await db.collection('Clientes').findOneAndUpdate(
      filter, {$set: { cnpj: data.cnpj, endereço: data.endereço, telefone: data.telefone, obser: data.obser }});
  } catch (error) {
    console.log(error);
  }
  if (db) {
    db.close();
  }
};

module.exports = {
  saveClient,
  getClients,
  delClient,
  putClient,
};