const { categoryService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');
const internalErrorResponse = require('../utils/internalErrorResponse');

const getAll = async (_req, res) => {
  try {
    const { status, data } = await categoryService.getAll();
    res.status(mapStatusHTTP(status)).json(data);
  } catch (e) {
    res.status(500).json(internalErrorResponse);
  }
};

const post = async (req, res) => {
  try {
    const { name } = req.body;
    const { status, data } = await categoryService.post({ name });
    res.status(mapStatusHTTP(status)).json(data);
  } catch (e) {
    res.status(500).json(internalErrorResponse);
  }
};

module.exports = { post, getAll };
