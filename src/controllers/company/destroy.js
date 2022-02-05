const { Company } = require('../../models');

module.exports = async (req, res) => {
  try {
    const id = req.params.id;
    const success = await Company.destroy({
      where: { id: id },
    });
    if (!success) {
      return res.json({
        meta: {
          status: 'error',
          message: `company id : ${id} not found`,
        },
        data: null,
      });
    }
    return res.json({
      meta: {
        status: 'success',
        message: `succes delete company id : ${id}`,
      },
      data: null,
    });
  } catch (error) {
    res.status(400);
    res.json({ errors: error.message });
  }
};
