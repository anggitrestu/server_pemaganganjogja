const { Admin, Company } = require('../../models');

module.exports = async (req, res) => {
  try {
    const admin = await Admin.find({
      include: [
        {
          model: Company,
          as: 'companies',
        },
      ],
    });

    console.log(admin);
    return res.json({
      meta: {
        status: 'success',
        message: 'succes get detail admin',
      },
      data: admin,
    });
  } catch (error) {
    res.status(400);
    res.json({ errors: error.message });
  }
};
