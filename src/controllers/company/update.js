const { Company } = require('../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
  try {
    const schema = {
      admin_id: 'number|optional|integer|positive|empty:false',
      name: 'string|empty:false',
      email: 'email|empty:false',
      address: 'string|empty:false',
      number: 'string|empty:false',
      website: 'string',
      type_of_business: 'string|empty:false',
      number_of_employee: 'number|empty:false',
      room_available: 'boolean|empty:false',
      instructor_available: 'boolean|empty:false',
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
    const company = await Company.findByPk(id);
    if (!company) {
      return res.status(400).json({
        meta: {
          status: 'error',
          message: 'company not found',
        },
        data: null,
      });
    }

    const data = {
      admin_id: req.admin.data.id,
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      number: req.body.number,
      website: req.body.website,
      type_of_business: req.body.type_of_business,
      number_of_employee: req.body.number_of_employee,
      room_available: req.body.room_available,
      instructor_available: req.body.instructor_available,
    };
    const updateCompany = await company.update(data);
    return res.json({
      meta: {
        status: 'success',
        message: 'succes update company',
      },
      data: updateCompany,
    });
  } catch (error) {
    res.status(400);
    res.json({ errors: error.message });
  }
};
