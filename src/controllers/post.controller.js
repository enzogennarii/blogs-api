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

module.exports = {
  post,
  getAll,
};
