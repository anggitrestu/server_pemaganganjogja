const { Internship, Company } = require('../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
  try {
    const schema = {
      company_id: 'number|optional|integer|positive|empty:false',
      name_program: 'string|empty:false',
      location: 'string|empty:false',
      condition: 'string|empty:false',
      job_desc: 'string|empty:false',
      disability: 'string',
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

    const company = await Company.findByPk(req.body.company_id);

    if (!company) {
      return res.status(404).json({
        meta: {
          status: 'error',
          message: 'company not found',
        },
        data: null,
      });
    }
    const internhsip = await Internship.create(req.body);
    return res.json({
      meta: {
        status: 'success',
        message: 'succes create data internhsip',
      },
      data: internhsip,
    });
  } catch (error) {
    res.status(400);
    res.json({ errors: error.message });
  }
};
