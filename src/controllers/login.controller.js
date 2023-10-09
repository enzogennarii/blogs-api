const { loginService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');
const internalErrorResponse = require('../utils/internalErrorResponse');

const post = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { status, data } = await loginService.post({ email, password });
    res.status(mapStatusHTTP(status)).json(data);
  } catch (e) {
    res.status(500).json(internalErrorResponse);
  }
};

module.exports = {
  post,
};