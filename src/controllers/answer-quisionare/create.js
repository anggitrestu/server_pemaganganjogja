const { AnswerQuestionnaire } = require('../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
  try {
    const schema = {
      questionnaire_id: 'number|empty:false',
      answer: 'string|empty:false',
    };

    const compile = v.compile(schema);
    const check = compile(req.body);
    if (check != true) {
      return res.status(400).json({
        meta: {
          status: 'error',
          message: check[0].message,
        },
        data: null,
      });
    }

    const answerSurvey = await AnswerQuestionnaire.create(req.body);
    return res.json({
      meta: {
        status: 'success',
        message: 'succes create  answerSurvey',
      },
      data: answerSurvey,
    });
  } catch (error) {
    res.status(400);
    res.json({ errors: error.message });
  }
};
