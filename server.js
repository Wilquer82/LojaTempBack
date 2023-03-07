const express = require('express');
const app = express();
const server = require('http').createServer(app);
const cors = require('cors')
const PORT = process.env.PORT || 3001;
const { getProducts, saveProduct} = require("./controller");
const connection = require("./connection.js")

const options = {
    methods: ['GET', 'POST'],
    origin:'*', 
    credentials: true,  
    optionSuccessStatus: 200,
  }
app.use(express.json());
app.use(cors(options));

connection();

app.get('/', (req, res) => {
  console.log("hello Word")
  getProducts(req);
});
app.use('/post', saveProduct);
app.post('/post', (req, res) => {
  console.log("hello Word");
  saveProduct(req);
});

// app.use('/product/:product', findOneProduct);
// app.get('/product/:product', (req, res) => { findOneProduct(req) });

// app.use('/path', pathProduct);

server.listen(PORT, () => {
  console.log(`Porta ${PORT}`);
});