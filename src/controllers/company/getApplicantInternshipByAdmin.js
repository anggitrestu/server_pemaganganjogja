const { Company, Internship, UserInternship, User } = require('../../models');

module.exports = async (req, res) => {
  try {
    const internship_id = req.params.internship_id;
    const company = await Company.findOne({
      where: {
        admin_id: req.admin.data.id,
      },
      attributes: [],
      include: [
        {
          model: Internship,
          as: 'internships',
          where: {
            id: internship_id,
          },
          attributes: ['id', 'name_program'],
          include: [
            {
              model: UserInternship,
              as: 'user_internships',
              attributes: ['user_id'],
              include: [
                {
                  model: User,
                  as: 'user',
                  attributes: ['fullname', 'email', 'phone_number'],
                },
              ],
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
