const connection = require('./connection');

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

const putProduct = async (req, res) => {  
  console.log("entrou no model");
  console.log("req", req);
  console.log("res", res);
  const existingProduct = await db.collection('Produtos').findOne({ product: req });
  console.log(existingProduct);
  // try {
  //     const { product } = req.params;
  //     const { quantity, value } = req.body;

  //     const updatedProduct = await Product.findOneAndUpdate(
  //       product,
  //       { []: value },
  //       { new: true }
  //     );

  //     res.status(200).json(updatedProduct);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: 'Internal server error' });
  //   }
  // },
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