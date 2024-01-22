const User = require('./model.js');
const connection = require('../connection');
const bcrypt = require('bcrypt');

exports.saveUser = async (req, res) => {
  try {
    const newUser = await User.saveUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    return { success: false, message: 'Erro ao salvar Usuário!' };
  }
};

exports.getUser = async (data, res) => {
  // console.log(data,'ReqUser')
  try {
    const user = await User.getUser(data);
    return res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}

exports.loginUser = async (req, res) => {
  const db = await connection();

  const email = req.body.data.email;
  const password = req.body.data.pass;
  
  const user = await db.collection('Users').findOne({email: email });
  
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(400).json({ message: 'Senha incorreta' });
  }

  res.json({ message: 'Login bem-sucedido', user });
};
