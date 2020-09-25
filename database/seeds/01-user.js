exports.seed = function (knex) {
  const users = [
    {
      id: 1,
      username: "thisishowwedo",
      email: "thisishowwedo@gmail.com",
      password: "password",
    },
    {
      id: 2,
      username: "gottacatchemall",
      email: "gottacatchemall@gmail.com",
      password: "password",
    },
  ];
  return knex("user")
    .insert(users)
    // .then(() => console.log("\n== Seed data for user table added. ==\n"));
};
