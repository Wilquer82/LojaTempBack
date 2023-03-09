const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const cors = require('cors')
const PORT = process.env.PORT || 3001;
const { getProducts, saveProduct, putProduct } = require("./products/controller");
const { saveUser } = require("./users/controller");
const connection = require("./connection.js")

const options = {
    methods: ['GET','POST','PUT','DELETE'],
    origin:'*', 
    credentials: true,  
    optionSuccessStatus: 200,
  }
app.use(express.json());
app.use(cors(options));

connection();

///////////////////////// Produtos

app.post('/post', saveProduct);
app.use('/post', saveProduct);

app.get('/', getProducts);
app.use('/get', getProducts)

app.put('/product/:product', async (req, res) => {
  const produto = req.params.product;
  const valor = req.body;
  
  const package = { produto, valor }
  putProduct(package);
});

////////////////////////////////////////////////////////////////

app.post('/user', saveUser);
app.use('/user', saveUser);



server.listen(PORT, () => {
  console.log(`Porta ${PORT}`);
});