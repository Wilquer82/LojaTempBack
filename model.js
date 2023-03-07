
const connection = require('./connection');

const saveProduct = async ({ data }) => {
  const db = await connection();

  try {
    const newProduct = db.collection('Produtos')
      .insertOne(data);
    return newProduct.insertedId; //Retirar esse inserted para testar
  } catch (error) {
    console.log(error);
  } finally {
    if (db) {
      db.close();
    }
  }
};

const getProducts = async () => {
  const db = await connection();
  console.log("entrou no get");
  return await db.collection('Produtos').find().toArray();
};

const pathProduct = async (id) => {
    const db = await connection();
      db.collection('Produtos').updateOne({ _id: ObjectID(id) }, { $set: update }, (err, result) => {
        assert.equal(null, err);
        console.log(`Produto ${id} atualizado com sucesso na coleção Produtos`);
        client.close();
        res.status(200).send(`Produto ${id} atualizado com sucesso na coleção Produtos`);
      });
}


// const findOneProduct = async (product) => {
//   console.log("model", product)
//   const db = await connection();
//   try {
//     const result = await db.collection('Produtos').findOne({product: product});
//     console.log(result);
//     return result;
//   } catch (error) {
//     console.log(error);
//   }
// };

module.exports = {
  saveProduct,
  getProducts,
  pathProduct,
  // findOneProduct,
};