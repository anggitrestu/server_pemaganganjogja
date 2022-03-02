const apiAdapter = require('../../../routes/apiAdapter');
const { URL_SERVICE_HACKLAB } = process.env;
const api = apiAdapter(URL_SERVICE_HACKLAB);

module.exports = async (req, res) => {
  try {
    console.log(req.body);
    const user = await api.post('/auth/register', req.body);
    return res.status(200).json(user.data);
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return res
        .status(500)
        .json({ status: 'error', message: 'service unavailable' });
    }
    if (error.response.data) {
      return res.status(400).json(error.response.data);
    }
    return res.status(400).json(error);
  }
};
