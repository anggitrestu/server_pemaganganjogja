const { Regulation, Internship } = require('../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
  try {
    const schema = {
      internship_id: 'number|empty:false|integer|positive|empty:false',
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

    console.log(req.body);
    const internhsip = await Internship.findOne({
      where: {
        id: req.body.internship_id,
      },
    });
    if (!internhsip) {
      return res.status(404).json({
        meta: {
          status: 'error',
          message: 'internship not found',
        },
        data: null,
      });
    }

    const checkRegulation = await Regulation.findOne({
      where: {
        internship_id: req.body.internship_id,
      },
    });

    if (checkRegulation) {
      return res.status(406).json({
        meta: {
          status: 'error',
          message: 'regulation for this internship was creted',
        },
        data: null,
      });
    }

    const regulation = await Regulation.create(req.body);

    return res.json({
      meta: {
        status: 'success',
        message: 'succes create data regulation',
      },
      data: regulation,
    });
  } catch (error) {
    res.status(400);
    res.json({ errors: error.message });
  }
};
