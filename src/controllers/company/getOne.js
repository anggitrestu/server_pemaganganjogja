const { Company, Internship } = require('../../models');

module.exports = async (req, res) => {
  try {
    const id = req.params.id;
    const company = await Company.findOne({
      where: {
        id: id,
      },
      attributes: {
        exclude: [
          'createdAt',
          'updatedAt',
          'deletedAt',
          'number',
          'email',
          'admin_id',
        ],
      },
      include: [
        {
          model: Internship,
          as: 'internships',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'deletedAt', 'company_id'],
          },
        },
      ],
    });

    return res.json({
      meta: {
        status: 'success',
        message: 'succes get detail company',
      },
      data: company,
    });
  } catch (error) {
    res.status(400);
    res.json({ errors: error.message });
  }
};
