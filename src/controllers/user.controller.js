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
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  post,
};
