const { OWNER_ID } = require("../config");

function isOwner(userId) {
  return String(userId) === String(OWNER_ID);
}

module.exports = { isOwner };
