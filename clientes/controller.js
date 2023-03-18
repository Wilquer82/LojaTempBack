const Client = require('./model.js');

exports.saveClient = async (req, res) => {
  console.log(req.body, "data controller")
  try {
    const newClient = await Client.saveClient(req.body);
    res.status(201).json(newClient);
  } catch (err) {
    return { success: false, message: 'Erro ao salvar Cliente!' };
  }
};

exports.getClients = async (req, res) => {
  try {
    const clients = await Client.getClients();
    return res.json(clients);
  } catch (err) {
    // res.status(500).json({ message: err.message });
  }
};