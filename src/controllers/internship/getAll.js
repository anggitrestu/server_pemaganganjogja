const { Op } = require('sequelize');
const { Internship, Company } = require('../../models');

module.exports = async (req, res) => {
  try {
    const nameCompany = req.query.company;
    const nameInternship = req.query.name;
    let internships = null;
    if (nameCompany || nameInternship) {
      internships = await Internship.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'deletedAt'],
        },
        where: {
          name_program: {
            [Op.substring]: nameInternship,
          },
        },
        include: [
          {
            model: Company,
            as: 'company',
            attributes: ['name', 'type_of_business'],
            where: {
              name: {
                [Op.substring]: nameCompany,
              },
            },
          },
        ],
      });
    } else {
      internships = await Internship.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'deletedAt'],
        },
        include: [
          {
            model: Company,
            as: 'company',
            attributes: ['name', 'type_of_business'],
          },
        ],
      });
    }

    return res.json({
      meta: {
        status: 'success',
        message: 'succes get all internships',
      },
      data: internships,
    });
  } catch (error) {
    res.status(400);
    res.json({ errors: error.message });
  }
};
