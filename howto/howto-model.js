const db = require("../database/connection");

module.exports = {
  add,
  find,
  findBy,
  findById,
  findHowToSteps,
  remove,
  update,
};

function add(howto) {
  return db("howto")
    .insert(howto, "id")
    .then(([id]) => {
      return findById(id);
    });
}

function find() {
  return db("howto").orderBy("id");
}

function findBy(filter) {
  return db("howto").where(filter).orderBy("id");
}

function findById(id) {
  return db("howto").where("id", id).first();
}

function remove(id) {
  return db("howto").where("id", id).del();
}

function update(id, change) {
  return db("howto").where("id", id).update(change);
}

function findHowToSteps(howto_id) {
  return db("howto")
    .join("steps", "steps.howto_id", "howto.id")
    .select(
      "howto.title",
      "howto.category",
      "steps.description as step"
    )
    .where('howto.id', howto_id)
}
