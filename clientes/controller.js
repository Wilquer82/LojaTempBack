const Client = require('./model.js');

exports.saveClient = async (req, res) => {
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

exports.delClient = async (req, res) => {
  try {
    await Client.delClient(req.params.client);
    return res.json({ success: true, message: 'Cliente deletado com sucesso' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};