const { UserQuestionnare, Questionnaire } = require('../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
  try {
    const schema = {
      user_id: 'number|integer|positive|empty:false',
      questionnaire_id: 'number|integer|positive|empty:false',
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

    const questionare = await Questionnaire.findByPk(req.body.questionnaire_id);
    if (!questionare) {
      return res.status(404).json({
        meta: {
          status: 'error',
          message: 'questionare not found',
        },
        data: null,
      });
    }
    const userQuestionare = await UserQuestionnare.create(req.body);
    return res.json({
      meta: {
        status: 'success',
        message: 'succes create user questionare',
      },
      data: userQuestionare,
    });
  } catch (error) {
    res.status(400);
    res.json({ errors: error.message });
  }
};
