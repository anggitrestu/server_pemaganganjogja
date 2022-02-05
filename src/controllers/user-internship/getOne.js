const { UserInternship, Internship } = require('../../models');

module.exports = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const userInternship = await UserInternship.findAll({
      where: {
        user_id: userId,
      },
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
