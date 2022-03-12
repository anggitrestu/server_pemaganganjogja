const { sequelize } = require('../../models');
const readXlsxFile = require('read-excel-file/node');

module.exports = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send('Please upload an excel file!');
    }
    let path =
      __basedir + '/server_pemaganganjogja/resources/' + req.file.filename;
    readXlsxFile(path).then((rows) => {
      // skip header
      rows.shift();
      rows.forEach(async (row) => {
        let user_id_hl = row[0];
        let email = row[1];
        let phone_number = row[2];
        try {
          const [totalUser] = await sequelize.query(
            'UPDATE Users SET email = (:email), phone_number = (:phone_number) WHERE (user_id_hl = (:user_id_hl))',
            {
              replacements: {
                email: email,
                phone_number: phone_number,
                user_id_hl: user_id_hl,
              },
              type: sequelize.QueryTypes.UPDATE,
            }
          );
        } catch (error) {
          console.log(error);
        }
      });

      return res.json({
        message: 'Uploaded the file successfully: ' + req.file.originalname,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Could not upload the file: ' + req.file.originalname,
    });
  }
};
