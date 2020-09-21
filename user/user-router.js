const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const User = require("./user-model");
const { validateUserId, validateUser } = require("./user-middleware");

router.get("/", (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json({ users });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then((user) => {
      res.status(200).json({ user });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  const password = req.body.password;

  const rounds = process.env.BCRYPT_ROUNDS || 8;
  const hash = bcryptjs.hashSync(password, rounds);

  User.update(id, { ...changes, password: hash })
    .then((user) => {
      res
        .status(200)
        .json({ message: `User with the id ${id} was successfully changed` });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  const id = req.params.id;

  User.remove(id)
    .then((deleted) => {
      res.status(204).end();
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

module.exports = router;
