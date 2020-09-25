exports.seed = function (knex) {
  const howto = [
    {
      id: 1,
      user_id: 1,
      title: "How to Register to Vote",
      category: "Voting",
      description:
        "If you're eligible, it's part of your civic duty to vote on Election Day. ",
    },
    {
      id: 2,
      user_id: 2,
      title: "How to Make a Great Pokemon Team",
      category: "Pokemon",
      description:
        "Do you feel like after becoming the champion, there's something wrong? Is that gym leader/Pokémon League member driving you nuts? Well, here's a guide on how to fix that!",
    },
    {
      id: 3,
      user_id: 1,
      title: "How to Find Out if You Have Already Had Coronavirus",
      category: "COVID 19",
      description:
        "To see if you’ve had COVID-19 in the past, you can get an antibody test from your local healthcare provider. ",
    },
  ];
  return knex("howto")
    .insert(howto)
    // .then(() => console.log("\n== Seed data for howto table added. ==\n"));
};
