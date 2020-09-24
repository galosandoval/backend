const db = require("../database/connection");


function add(steps) {
  return db("steps")
  .insert(steps, "id")
  .then(([id]) => {
    return findById(id);
  });
}

const add = async (steps) => {
  const [id] = await db('steps').insert(steps).returning('id')
  return findById(id)
} 

function find() {
  return db("steps").orderBy("id");
}

function findBy(filter) {
  return db("steps").where(filter).orderBy("id");
}

function findById(id) {
  return db("steps").where({id}).first();
}

function remove(id) {
  return db("steps").where({id}).del();
}

function update(id, change) {
  return db("steps").where({id}).update(change);
}

module.exports = {
  add,
  find,
  findBy,
  findById,
  remove,
  update,
};
