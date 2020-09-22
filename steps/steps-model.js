const db = require("../database/connection");

module.exports = {
  add,
  find,
  findBy,
  findById,
  remove,
  update,
};

function add(steps) {
  return db("steps")
    .insert(steps, "id")
    .then(([id]) => {
      return findById(id);
    });
}

function find() {
  return db("steps").orderBy("id");
}

function findBy(filter) {
  return db("steps").where(filter).orderBy("id");
}

function findById(id) {
  return db("steps").where("id", id).first();
}

function remove(id) {
  return db("steps").where("id", id).del();
}

function update(id, change) {
  return db("steps").where("id", id).update(change);
}

