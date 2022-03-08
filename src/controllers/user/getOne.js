const {
  User,
  UserQuestionnare,
  UserSurvey,
  Questionnaire,
  Survey,
} = require('../../models');

module.exports = async (req, res) => {
  try {
    const id = req.params.id;
    const detailUser = await User.findOne({
      where: {
        id: id,
      },
      attributes: {
        exclude: [
          'createdAt',
          'updatedAt',
          'deletedAt',
          'start_date',
          'end_date',
        ],
      },
      include: [
        {
          model: UserQuestionnare,
          as: 'user_quistionnares',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'deletedAt'],
          },
          include: [
            {
              model: Questionnaire,
              as: 'question',
              attributes: ['question'],
            },
          ],
        },
        {
          model: UserSurvey,
          as: 'user_survey',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'deletedAt'],
          },
          include: [
            {
              model: Survey,
              as: 'question',
              attributes: ['question'],
            },
          ],
        },
      ],
    });

    return res.json({
      meta: {
        status: 'success',
        message: 'succes get detail internship',
      },
      data: detailUser,
    });
  } catch (error) {
    res.status(400);
    res.json({ errors: error.message });
  }
};
