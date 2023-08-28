const { userService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const post = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const { status, data } = await userService.post({
      displayName, email, password, image,
    });
    res.status(mapStatusHTTP(status)).json(data);
  } catch (e) {
    res.status(mapStatusHTTP('INTERNAL_SERVER_ERROR')).json({ message: e.message });
  }
};

const getAll = async (_req, res) => {
  try {
    const { status, data } = await userService.getAll();
    res.status(mapStatusHTTP(status)).json(data);
  } catch (e) {
    res.status(mapStatusHTTP('INTERNAL_SERVER_ERROR')).json({ message: e.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, data } = await userService.getById(id);
    res.status(mapStatusHTTP(status)).json(data);
  } catch (e) {
    res.status(mapStatusHTTP('INTERNAL_SERVER_ERROR')).json({ message: e.message });
  }
};

module.exports = {
  post,
  getAll,
  getById,
};
