exports.up = function (knex) {
  return knex.schema
    .createTable("user", (tbl) => {
      tbl.increments();

      tbl.string("username", 128).unique().notNullable();

      tbl.string("email", 128).unique().notNullable();

      tbl.string("password", 128).notNullable();
    })
    .createTable("howto", (tbl) => {
      tbl.increments();

      tbl.string("title", 128).index().notNullable();

      tbl.string("category", 200).notNullable();

      tbl.string("description", 300).notNullable();

      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("steps", (tbl) => {
      tbl.increments();

      tbl
        .integer("howto_id")
        .unsigned()
        .notNullable()
        .references("howto.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

      tbl.string("description", 200).notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("steps")
    .dropTableIfExists("howto")
    .dropTableIfExists("user");
};
