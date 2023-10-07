const { categoryService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getAll = async (_req, res) => {
  try {
    const { status, data } = await categoryService.getAll();
    res.status(mapStatusHTTP(status)).json(data);
  } catch (e) {
    res.status(500).json({ message: 'Algo deu errado!' });
  }
};

const post = async (req, res) => {
  try {
    const { name } = req.body;
    const { status, data } = await categoryService.post({ name });
    res.status(mapStatusHTTP(status)).json(data);
  } catch (e) {
    res.status(500).json({ message: 'Algo deu errado!' });
  }
};

module.exports = { post, getAll };
