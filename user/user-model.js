const db = require("../database/connection");

module.exports = {
  add,
  find,
  findBy,
  findById,
  loginIsValid,
  registerIsValid,
  remove,
  update,
};

function add(user) {
  return db("user")
    .insert(user, "id")
    .then(([id]) => {
      return findById(id);
    });
}

function find() {
  return db("user").orderBy("id");
}

function findBy(filter) {
  return db("user").where(filter).orderBy("id");
}

function findById(id) {
  return db("user").where({ id }).first();
}

function loginIsValid(user) {
  return Boolean(
    (user.username && user.password && typeof user.password === "string") ||
      (user.email && user.password && typeof user.password === "string")
  );
}

function registerIsValid(user) {
  return Boolean(
    user.username &&
      user.email &&
      user.password &&
      typeof user.password === "string"
  );
}

function remove(id) {
  return db("user").where("id", id).del();
}

function update(id, change) {
  return db("user").where("id", id).update(change);
}
