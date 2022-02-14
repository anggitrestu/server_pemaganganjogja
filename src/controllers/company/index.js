const create = require('./create');
const getOne = require('./getOne');
const getAll = require('./getAll');
const getName = require('./getName');
const update = require('./update');
const destroy = require('./destroy');
const getByAdmin = require('./getByAdmin');

module.exports = {
  destroy,
  update,
  create,
  getOne,
  getName,
  getAll,
  getByAdmin,
};
