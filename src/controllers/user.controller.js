const { userService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getAll = async (_req, res) => {
  try {
    const { status, data } = await userService.getAll();
    res.status(mapStatusHTTP(status)).json(data);
  } catch (e) {
    res.status(500).json({ message: 'Algo deu errado!' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, data } = await userService.getById(id);
    res.status(mapStatusHTTP(status)).json(data);
  } catch (e) {
    res.status(500).json({ message: 'Algo deu errado!' });
  }
};

const post = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const { status, data } = await userService.post({
      displayName, email, password, image,
    });
    res.status(mapStatusHTTP(status)).json(data);
  } catch (e) {
    res.status(500).json({ message: 'Algo deu errado!' });
  }
};

const removeUser = async (req, res) => {
  try {
    const { userId } = req;
    const { status } = await userService.removeUser(userId);
    res.status(mapStatusHTTP(status)).end();
  } catch (e) {
    res.status(500).json({ message: 'Algo deu errado!' });
  }
};

module.exports = { getAll, getById, post, removeUser };
