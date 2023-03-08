const express = require('express');
const app = express();
const server = require('http').createServer(app);
const cors = require('cors')
const PORT = process.env.PORT || 3001;
const { getProducts, saveProduct, putProduct} = require("./controller");
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

app.post('/post', saveProduct);
app.use('/post', saveProduct);

app.get('/', getProducts);
app.use('/get', getProducts)

app.put('/product/:product', function (req, res) {
  putProduct(req.params.product, req.body);
  res.send(`Editar produto: ${req.params.product}`);
});


server.listen(PORT, () => {
  console.log(`Porta ${PORT}`);
});