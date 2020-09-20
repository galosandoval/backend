exports.seed = function (knex) {
  const steps = [
    {
      id: 1,
      howto_id: 1,
      description:
        "Follow the registration guidelines for the state you live and will vote in.",
    },
    {
      id: 2,
      howto_id: 1,
      description:
        "Confirm you're eligible to vote based on your age and citizenship status.",
    },
    {
      id: 3,
      howto_id: 1,
      description: "Check your state's additional eligibility laws",
    },
    {
      id: 4,
      howto_id: 1,
      description: "Note your state's registration deadline",
    },
    {
      id: 5,
      howto_id: 2,
      description:
        "Pick your starter. Your starter Pokémon is the core of your party (generally). ",
    },
    {
      id: 6,
      howto_id: 2,
      description: "Learn about your party.",
    },
    {
      id: 7,
      howto_id: 2,
      description:
        "Practice different movesets on all the Pokémon. Also, it might not be best to have all legendaries. Use good Pokémon that you like.",
    },
    {
      id: 8,
      howto_id: 3,
      description:
        "Contact your state or local health provider to see if you should get tested.",
    },
    {
      id: 9,
      howto_id: 3,
      description: "Get a diagnostic test if you’re showing COVID-19 symptoms.",
    },
    {
      id: 10,
      howto_id: 3,
      description: "Get an antibody test 1-3 weeks after you were sick.",
    },
    {
      id: 11,
      howto_id: 3,
      description: "Wear a face mask to the testing center.",
    },
    {
      id: 12,
      howto_id: 3,
      description: "Allow the doctor to draw blood or take a finger prick.",
    },
    {
      id: 13,
      howto_id: 3,
      description: "Wait 1 to 3 days for your test results.",
    },
  ];
  return knex('steps').insert(steps).then(()=>console.log("\n== Seed data for steps table added. ==\n"))
};
