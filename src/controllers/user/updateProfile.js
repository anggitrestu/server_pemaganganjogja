const { User } = require('../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
  try {
    console.log(req.body);
    const schema = {
      user_id_hl: 'number|optional|integer|positive|empty:false',
      fullname: 'string|empty:false',
      province: 'string|empty:false',
      city: 'string|empty:false',
      marital_status: 'string|empty:false',
      about_you: 'string|empty:false',
      work_experience: 'string|empty:false',
      educational_background: 'string|empty:false',
      name_edu: 'string|empty:false',
      level_edu: 'string|empty:false',
      major_edu: 'string|empty:false',
      email: 'string|empty:false',
      phone_number: 'string|empty:false',
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

    const user = await User.create(req.body);

    return res.json({
      meta: {
        status: 'success',
        message: 'succes update profile user',
      },
      data: user,
    });
  } catch (error) {
    res.status(400);
    res.json({ errors: error.message });
  }
};
