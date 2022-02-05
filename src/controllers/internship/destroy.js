const { Internship } = require('../../models');

module.exports = async (req, res) => {
  try {
    const id = req.params.id;
    const success = await Internship.destroy({
      where: { id: id },
    });
    if (!success) {
      return res.json({
        meta: {
          status: 'error',
          message: `internship id : ${id} not found`,
        },
        data: null,
      });
    }
    return res.json({
      meta: {
        status: 'success',
        message: `succes delete internship id : ${id}`,
      },
      data: null,
    });
  } catch (error) {
    res.status(400);
    res.json({ errors: error.message });
  }
};
