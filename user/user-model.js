const db = require("../database/connection");

module.exports = {
  add,
  findBy,
  findById,
  registerIsValid,
  loginIsValid,
};


function add(user) {
  return db("user")
    .insert(user)
    .returning("id")
    .then(([id]) => {
      return findById(id);
    });
}

function findBy(filter) {
  return db("user").where(filter).orderBy("id");
}

function findById(id) {
  return db("user").where({ id }).first();
}

function registerIsValid(user) {
  return Boolean(
    user.username &&
      user.email &&
      user.password &&
      typeof user.password === "string"
  );
}

function loginIsValid(user) {
  return Boolean(
    (user.username && user.password && typeof user.password === "string") ||
      (user.email && user.password && typeof user.password === "string")
  );
}
