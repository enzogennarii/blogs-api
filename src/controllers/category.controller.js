const { categoryService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const post = async (req, res) => {
  try {
    const { name } = req.body;
    const { status, data } = await categoryService.post({ name });
    res.status(mapStatusHTTP(status)).json(data);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  post,
};
