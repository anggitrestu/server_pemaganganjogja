const { UserInternship, Internship } = require('../../models');

module.exports = async (req, res) => {
  try {
    const userInternship = await UserInternship.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'deletedAt'],
      },
      include: [
        {
          model: Internship,
          as: 'internships',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'deletedAt'],
          },
        },
      ],
    });

    return res.json({
      meta: {
        status: 'success',
        message: 'succes get detail userInternship',
      },
      data: userInternship,
    });
  } catch (error) {
    res.status(400);
    res.json({ errors: error.message });
  }
};
