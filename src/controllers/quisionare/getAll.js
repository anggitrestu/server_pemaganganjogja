const { Questionnaire, AnswerQuestionnaire } = require('../../models');

module.exports = async (req, res) => {
  try {
    const surveys = await Questionnaire.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'deletedAt'],
      },
      include: [
        {
          model: AnswerQuestionnaire,
          as: 'answers',
          attributes: ['id', 'answer'],
        },
      ],
    });

    return res.json({
      meta: {
        status: 'success',
        message: 'succes get kuisioner',
      },
      data: surveys,
    });
  } catch (error) {
    res.status(400);
    res.json({ errors: error.message });
  }
};
