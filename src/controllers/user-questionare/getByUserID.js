const { Questionnaire, UserQuestionnare } = require('../../models');

module.exports = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const userInternship = await Questionnaire.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'deletedAt'],
      },
      include: [
        {
          model: UserQuestionnare,
          as: 'user_answers',
          attributes: ['user_id', 'answer'],
          where: {
            user_id: user_id,
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
