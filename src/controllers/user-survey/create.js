const { Survey, UserSurvey } = require('../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
  try {
    const schema = {
      user_id: 'number|integer|positive|empty:false',
      survey_id: 'number|integer|positive|empty:false',
      answer: 'string|empty:false',
    };
    console.log(req.body);
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

    const survey = await Survey.findByPk(req.body.survey_id);
    if (!survey) {
      return res.status(404).json({
        meta: {
          status: 'error',
          message: 'survey not found',
        },
        data: null,
      });
    }
    const userQuestionare = await UserSurvey.create(req.body);
    return res.json({
      meta: {
        status: 'success',
        message: 'succes create user survey',
      },
      data: userQuestionare,
    });
  } catch (error) {
    res.status(400);
    res.json({ errors: error.message });
  }
};
