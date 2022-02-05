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

    const checkCompany = await Company.findOne({
      where: {
        admin_id: req.admin.data.id,
      },
    });
    if (checkCompany) {
      return res.status(406).json({
        meta: {
          status: 'error',
          message: 'company for this admin was creted',
        },
        data: null,
      });
    }

    req.body.admin_id = req.admin.data.id;
    const company = await Company.create(req.body);

    return res.json({
      meta: {
        status: 'success',
        message: 'succes create data company',
      },
      data: company,
    });
  } catch (error) {
    res.status(400);
    res.json({ errors: error.message });
  }
};
