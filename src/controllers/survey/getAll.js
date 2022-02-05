const { Survey, AnswerSurvey } = require('../../models');

module.exports = async (req, res) => {
  try {
    const surveys = await Survey.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'deletedAt'],
      },
      include: [
        {
          model: AnswerSurvey,
          as: 'answers',
          attributes: ['id', 'answer'],
        },
      ],
    });

    return res.json({
      meta: {
        status: 'success',
        message: 'succes get suveys',
      },
      data: surveys,
    });
  } catch (error) {
    res.status(400);
    res.json({ errors: error.message });
  }
};
