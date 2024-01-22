const express = require('express');
const app = express();
const server = require('http').createServer(app);
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const { saveRecipe } = require("./receitas/controller");
const { saveUser, loginUser } = require("./users/controller");
const connection = require('./connection');
const { ObjectId } = require('mongodb');


app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));

const options = {
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(options));

app.use(express.json());

app.post('/salvar', saveRecipe);
app.use('/salvar', saveRecipe);

//////////////////////////////////////////////////////

app.post('/user', saveUser);
app.use('/user', saveUser);

app.post('/login', loginUser);
app.use('/login', loginUser);

// app.get('/verificarUsuario', getUser);
// app.use('/verificarUsuario', getUser);

app.get('/verificarUsuario', async (req, res) => {
  const db = await connection();
  const email = req.query.email;
  const usuario = await db.collection('Users').findOne({ email: email });
  if (usuario) {
    res.json({ existe: true });
  } else {
    res.json({ existe: false });
  }
});

app.patch('/salvarAvatar', async (req, res) => {
  const db = await connection();
  const buffer = Buffer.from(req.body.avatar, 'base64');

  const resultado = await db.collection('Users').updateOne(
    { email: req.body.email },
    { $set: { avatar: buffer.toString('base64') } }
  );

  if (resultado.modifiedCount === 1) {
    res.json({ sucesso: true });
  } else {
    res.status(400).json({ sucesso: false });
  }
});


app.patch('/atualizarUsuario/:id', async (req, res) => {
  const db = await connection();
  const { id } = req.params;
  const { nome, email } = req.body;
  
  const NewId = new ObjectId(id)

  const resultado = await db.collection('Users').updateOne(
    { _id: NewId },
    { $set: { user: nome, email: email } }
  );

  if (resultado.modifiedCount === 1) {
    res.json({ sucesso: true });
  } else {
    res.status(400).json({ sucesso: false });
  }
});



server.listen(PORT, () => {
  console.log(`Porta ${PORT}`);
});
