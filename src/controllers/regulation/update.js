const { Regulation, Company } = require('../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
  try {
    const schema = {
      company_id: 'number|optional|integer|positive|empty:false',
      education: 'string|empty:false',
      age: 'number|empty:false',
      gender: 'string|empty:false',
      experience: 'string|empty:false',
      certificate: 'string|empty:false',
      other_condition: 'string',
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
    const regulation = await Regulation.findByPk(id);
    if (!regulation) {
      return res.status(404).json({
        meta: {
          status: 'error',
          message: 'regulation not found',
        },
        data: null,
      });
    }

    if (!regulation) {
      return res.status(400).json({
        meta: {
          status: 'error',
          message: 'regulation was created for this company ',
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

    const data = {
      company_id: req.body.company_id,
      education: req.body.education,
      age: req.body.age,
      gender: req.body.gender,
      experience: req.body.experience,
      certificate: req.body.certificate,
      other_condition: req.body.other_condition,
    };

    const updateRegulation = await regulation.update(data);

    return res.json({
      meta: {
        status: 'success',
        message: 'succes update data regulation',
      },
      data: updateRegulation,
    });
  } catch (error) {
    res.status(400);
    res.json({ errors: error.message });
  }
};
