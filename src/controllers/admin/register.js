const { Admin } = require('../../models');
const bcrypt = require('bcrypt');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
  try {
    const schema = {
      name: 'string|empty:false',
      position: 'string|empty:false',
      number: 'string|empty:false',
      email: 'email|empty:false',
      password: 'string|min:6',
    };

    const compile = v.compile(schema);
    const check = compile(req.body);
    console.log(check);
    if (check != true) {
      return res.status(400).json({
        meta: {
          status: 'error',
          message: check[0].message,
        },
        data: null,
      });
    }

    const admin = await Admin.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (admin) {
      return res.status(404).json({
        meta: {
          status: 'error',
          message: 'email already exist',
        },
        data: null,
      });
    }

    const password = await bcrypt.hash(req.body.password, 10);
    const data = {
      name: req.body.name,
      email: req.body.email,
      position: req.body.position,
      number: req.body.number,
      password,
    };

    const createUser = await Admin.create(data);

    return res.json({
      meta: {
        status: 'success',
        message: 'register admin',
      },
      data: {
        id: createUser.id,
      },
    });
  } catch (error) {
    res.status(404);
    res.json({ errors: error.message });
  }
};
