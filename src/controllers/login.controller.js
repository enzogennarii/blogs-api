const { loginService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const post = async (req, res) => {
  try {
    console.log('Passou do middleware');
    const { email, password } = req.body;
    const { status, data } = await loginService.post({ email, password });
    res.status(mapStatusHTTP(status)).json(data);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  post,
};