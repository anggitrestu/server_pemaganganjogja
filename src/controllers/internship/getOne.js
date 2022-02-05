const { Internship, Regulation, Company } = require('../../models');

module.exports = async (req, res) => {
  try {
    const id = req.params.id;
    const internship = await Internship.findOne({
      where: {
        id: id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'deletedAt'],
      },
      include: [
        {
          model: Regulation,
          as: 'regulation',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'deletedAt'],
          },
        },
        {
          model: Company,
          as: 'company',
          attributes: ['name'],
        },
      ],
    });

    return res.json({
      meta: {
        status: 'success',
        message: 'succes get detail internship',
      },
      data: internship,
    });
  } catch (error) {
    res.status(400);
    res.json({ errors: error.message });
  }
};
