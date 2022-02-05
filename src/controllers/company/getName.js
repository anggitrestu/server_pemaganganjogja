const { Company } = require('../../models');

module.exports = async (req, res) => {
  try {
    const companies = await Company.findAll({
      attributes: ['name'],
    });

    return res.json({
      meta: {
        status: 'success',
        message: 'succes get  all name company',
      },
      data: companies,
    });
  } catch (error) {
    res.status(400);
    res.json({ errors: error.message });
  }
};
