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


exports.loginUser = async (req, res) => {
  const db = await connection();
  const username = req.body.data.user;
  const password = req.body.data.pass;
  
  const user = await db.collection('Login').findOne({user: username });

  if (!user) {
    return res.status(400).json({ message: 'Usuário não encontrado' });
  }
  
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(400).json({ message: 'Senha incorreta' });
  }

  res.json({ message: 'Login bem-sucedido' });
  if (db) {
    db.close();
  }
};

