const { postService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const post = async (req, res) => {
  try {
    const { userId } = req;
    const { title, content, categoryIds } = req.body;
    const postData = { title, content, categoryIds, userId };
    const { status, data } = await postService.post(postData);
    res.status(mapStatusHTTP(status)).json(data);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getAll = async (_req, res) => {
  try {
    const { status, data } = await postService.getAll();
    res.status(mapStatusHTTP(status)).json(data);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, data } = await postService.getById(id);
    res.status(mapStatusHTTP(status)).json(data);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const { status, data } = await postService.update({ id, title, content });
    res.status(mapStatusHTTP(status)).json(data);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const serviceResponse = await postService.remove(id);

    if (serviceResponse.status !== 'NO_CONTENT') {
      const { status, data } = serviceResponse;
      res.status(mapStatusHTTP(status)).json(data);
    }

    res.status(mapStatusHTTP(serviceResponse.status)).end();
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  post,
  getAll,
  getById,
  update,
  remove,
};
