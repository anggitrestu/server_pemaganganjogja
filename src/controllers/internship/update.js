const { Internship } = require('../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
  try {
    const schema = {
      company_id: 'number|optional|integer|positive|empty:false',
      name_program: 'string|empty:false',
      quota: 'number|empty:false',
      industrial_field: 'string|empty:false',
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
    const id = req.params.id;
    const internship = await Internship.findByPk(id);
    if (!internship) {
      return res.status(400).json({
        meta: {
          status: 'error',
          message: 'internship not found',
        },
        data: null,
      });
    }

    const data = {
      company_id: req.body.company_id,
      name_program: req.body.name_program,
      quota: req.body.quota,
      industrial_field: req.body.industrial_field,
    };
    const updateCompany = await internship.update(data);
    return res.json({
      meta: {
        status: 'success',
        message: 'succes update internship',
      },
      data: updateCompany,
    });
  } catch (error) {
    res.status(400);
    res.json({ errors: error.message });
  }
};
