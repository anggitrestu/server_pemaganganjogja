const { Op } = require('sequelize');
const {
  Company,
  Internship,
  UserInternship,
  sequelize,
} = require('../../models');

module.exports = async (req, res) => {
  try {
    const users = await Company.findAll({
      attributes: ['id', 'name'],
      include: [
        {
          model: Internship,
          as: 'internships',
          // group: 'internships.id',
          attributes: ['name_program'],
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

    const totalCompany = await Company.count();
    const totalInternship = await Internship.count();

    const [totalUser] = await sequelize.query(
      'select count(id) as totalUser from Users where  exists (select * from UserSurveys where UserSurveys.user_id = Users.id) and exists (select * from UserInternships where UserInternships.user_id = Users.id) and exists (select * from UserQuestionnares where UserQuestionnares.user_id = Users.id)'
    );

    const data = {
      totalUser: totalUser[0].totalUser,
      totalCompany,
      totalInternship,
      users: users,
    };

    return res.json({
      meta: {
        status: 'success',
        message: 'succes get all users',
      },
      data: data,
    });
  } catch (error) {
    res.status(400);
    res.json({ errors: error.message });
  }
};
