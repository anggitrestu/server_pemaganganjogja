const { Survey } = require('../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
  try {
    const schema = {
      question: 'string|empty:false',
      type: {
        type: 'string',
        enum: ['radio-button', 'checkbox', 'textarea', 'date', 'select'],
      },
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

    const survey = await Survey.create(req.body);
    return res.json({
      meta: {
        status: 'success',
        message: 'succes create data survey',
      },
      data: survey,
    });
  } catch (error) {
    res.status(400);
    res.json({ errors: error.message });
  }
};
