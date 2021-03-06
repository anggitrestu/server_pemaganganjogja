const { Company, Internship, UserInternship } = require('../../models');

module.exports = async (req, res) => {
  try {
    const company = await Company.findOne({
      where: {
        admin_id: req.admin.data.id,
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
          include: [
            {
              model: UserInternship,
              as: 'user_internships',
              attributes: ['user_id'],
            },
          ],
        },
      ],
    });

    return res.json({
      meta: {
        status: 'success',
        message: 'succes get my company',
      },
      data: company,
    });
  } catch (error) {
    res.status(400);
    res.json({ errors: error.message });
  }
};
