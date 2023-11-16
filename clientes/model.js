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
};

const putClient = async ( data ) => {  
  const db = await connection();

  try {
    const existingClient = await db.collection('Clientes').findOne({ _id: data._id });

    if (!existingClient) {
      throw new Error('Cliente não encontrado');
    }

    const filter = { _id : data._id }
    const update = { 
      $set: { 
        nome: data.nome, 
        cnpj: data.cnpj, 
        endereço: data.endereço, 
        telefone: data.telefone, 
        obser: data.obser 
      }
    };

    const updatedClient = await db.collection('Clientes').findOneAndUpdate(filter, update);

    return updatedClient;
  } catch (error) {
    console.log(error);
    throw error;
  }
};



module.exports = {
  saveClient,
  getClients,
  delClient,
  putClient,
};