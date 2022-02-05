const { Admin } = require('../../models');
const bcrypt = require('bcrypt');
const Validator = require('fastest-validator');
const v = new Validator();
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;

module.exports = async (req, res) => {
  try {
    const schema = {
      email: 'email|empty:false',
      password: 'string|min:6',
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
    const admin = await Admin.findOne({
      where: {
        email: req.body.email,
      },
    });
    console.log(admin);

    if (!admin) {
      return res.status(404).json({
        meta: {
          status: 'error',
          message: 'admin not found',
        },
        data: null,
      });
    }

    const data = {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    };

    const token = jwt.sign({ data }, JWT_SECRET_KEY);

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      admin.password
    );

    if (!isValidPassword) {
      return res.status(404).json({
        status: 'error',
        message: 'password failed',
      });
    }

    return res.json({
      meta: {
        status: 'success',
        message: 'succes get admin',
      },
      data: {
        token: token,
      },
    });
  } catch (error) {
    res.status(400);
    res.json({ errors: error.message });
  }
};
