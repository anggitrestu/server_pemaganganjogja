const { UserInternship, Internship } = require('../../models');
const Validator = require('fastest-validator');
const v = new Validator();
const { Op } = require('sequelize');

module.exports = async (req, res) => {
  try {
    const schema = {
      user_id: 'number|integer|positive|empty:false',
      user_id_hl: 'number|integer|positive|empty:false',
      internship_id: 'number|integer|positive|empty:false',
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

    const checkUserInternship = await UserInternship.findOne({
      where: {
        [Op.and]: [
          { internship_id: req.body.internship_id },
          { user_id: req.body.user_id },
        ],
      },
    });

    if (checkUserInternship) {
      return res.status(406).json({
        meta: {
          status: 'error',
          message: 'cant double internship',
        },
        data: null,
      });
    }

    const internship = await Internship.findByPk(req.body.internship_id);
    if (!internship) {
      return res.status(404).json({
        meta: {
          status: 'error',
          message: 'internship not found',
        },
        data: null,
      });
    }
    const userInternship = await UserInternship.create(req.body);
    return res.json({
      meta: {
        status: 'success',
        message: 'succes create data userInternship',
      },
      data: userInternship,
    });
  } catch (error) {
    res.status(400);
    res.json({ errors: error.message });
  }
};
