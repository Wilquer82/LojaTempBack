const bcrypt = require('bcrypt');
const connection = require('../connection');


const saveUser = async ({ data }) => {
  console.log(data, 'MODEL');
  const db = await connection();
  try {
    const existUser = await db.collection('Users')
      .findOne({ email: data.email });
    if (existUser) {
      throw new Error('Já existe um Usuário com esse nome');
    }

    const password = data.password;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    data.password = hashedPassword;

    await db.collection('Users').insertOne(data);
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

// const getUser = async (req, res) => {
//   const email = req.query.email;

//   // const email = req.originalUrl.slice(1);
//   const db = await connection();
//   try {
//     const existUser = await db.collection('Users')
//       .findOne({ email: email });
//     if (existUser) {
//       res.json({existUser}); // Return the existing user data
//     } else {
//       res.json( {message: 'Usuário não encontrado'});
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: 'Erro ao buscar Usuário', res: false });
//   }finally {
//     if (db) {
//       db.close();
//     }
//   }
// }


module.exports = {
  saveUser,
  // getUser
};