const validateLoginFields = require('./validateLoginFields');
const validateNewUser = require('./validateNewUser');
const validateToken = require('./validateToken');
const validateNewCategory = require('./validateNewCategory');
const validateNewPost = require('./validateNewPost');
const validateAuthorization = require('./validateAuthorization');
const validatePostUpdate = require('./validatePostUpdate');

module.exports = {
  validateLoginFields,
  validateNewUser,
  validateToken,
  validateNewCategory,
  validateNewPost,
  validateAuthorization,
  validatePostUpdate,
};
