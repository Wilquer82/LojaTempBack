const connection = require('../connection');

const saveProduct = async ({ data }) => {
  const db = await connection();
  try {
    const existingProduct = await db.collection('Produtos')
      .findOne({ product: data.product });
    if (existingProduct) {
      throw new Error('Já existe um produto com esse nome');
    }
    await db.collection('Produtos').insertOne(data);
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

const putProduct = async (data, res) => {  
  const db = await connection();

  try {
    const existingProduct = await db.collection('Produtos').findOne({ product: data.produto });
    const filter = { product : data.produto}
    const newValue = parseInt(data.valor.value) + parseInt(existingProduct.quantity);
    const updatedProduct = await db.collection('Produtos').findOneAndUpdate(
      filter, {$set: { quantity: newValue }});
  } catch (error) {
    console.log(error);
  }
};

const getProducts = async () => {
  const db = await connection();
  return await db.collection('Produtos').find().toArray();
};

module.exports = {
  saveProduct,
  getProducts,
  putProduct,
};