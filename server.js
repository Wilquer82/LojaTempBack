const express = require('express');
const app = express();
const server = require('http').createServer(app);
const cors = require('cors')
const PORT = process.env.PORT || 3001;
// const { getProducts, saveProduct, putProduct } = require("./products/controller");
const { saveUser, loginUser } = require("./users/controller");
const { saveMoviment, getMoviment } = require("./movimento/controller");
const connection = require("./connection.js");
const { saveClient, getClients, delClient, putClient } = require('./clientes/controller');

const options = {
    methods: ['GET','POST','PUT','DELETE'],
    origin:'*', 
    credentials: true,  
    optionSuccessStatus: 200,
  }
app.use(express.json());
app.use(cors(options));

connection();

//=================================PRODUTOS===================================

// app.post('/post', saveProduct);
// app.use('/post', saveProduct);

// app.get('/', getProducts);
// app.use('/get', getProducts);

// app.delete('/delete/:product', delProduct);
// app.use('/delete/:product', delProduct);

// app.put('/product/:product', async (req, res) => {
//   const produto = req.params.product;
//   const valor = req.body;
  
//   const package = { produto, valor }
//   putProduct(package);
// });

//--------------------------------Usuários--------------------------------

app.post('/user', saveUser);
app.use('/user', saveUser);

app.post('/login', loginUser);
app.use('/login', loginUser);

//--------------------------------Clientes--------------------------------

app.post('/client', saveClient);
app.use('/client', saveClient);

app.get('/clients', getClients);
app.use('/clients', getClients);

app.delete('/delete/:client', delClient);
app.use('/delete/:client', delClient);

app.put('/put', putClient);

//-------------------------------MOVIMENTO----------------------------------

app.post('/moviment', saveMoviment);
app.use('/moviment', saveMoviment);

app.get('/getmov', getMoviment);
app.use('/getmov', getMoviment);


server.listen(PORT, () => {
  console.log(`Porta ${PORT}`);
});