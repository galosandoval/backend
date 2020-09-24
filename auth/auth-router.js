const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../user/user-model");

router.post("/register", (req, res) => {
  const creds = req.body;

  if (User.registerIsValid(creds)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;

    const hash = bcryptjs.hashSync(creds.password, rounds);

    creds.password = hash;

    User.add(creds)
      .then((user) => {
        const token = makeJwt(user);

        res.status(201).json({ data: user, token }); // if you want to log someone in after they register
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message: "please provide your email, username, and password",
    });
  }
});

router.post("/login", (req, res) => {
  const creds = req.body;

  if (User.loginIsValid(creds)) {
    if (creds.username) {
      // console.log("logging in by username");

      User.findBy({ username: creds.username })
        .then(([user]) => {
          // compare the password the hash stored in the database
          if (user && bcryptjs.compareSync(creds.password, user.password)) {
            const token = makeJwt(user);

            res.status(200).json({ message: "Welsome to our API", token });
          } else {
            res.status(401).json({ message: "Invalid credentials" });
          }
        })
        .catch((error) => {
          res.status(500).json({ message: error.message });
        });
    }
    if (creds.email) {
      // console.log("logging in by email");

      User.findBy({ email: creds.email })
        .then(([user]) => {
          // compare the password the hash stored in the database
          if (user && bcryptjs.compareSync(creds.password, user.password)) {
            const token = makeJwt(user);

            res.status(200).json({ message: "Welsome to our API", token });
          } else {
            res.status(401).json({ message: "Invalid credentials" });
          }
        })
        .catch((error) => {
          res.status(500).json({ message: error.message });
        });
    }
  } else {
    res.status(400).json({
      message:
        "please provide username and password and the password shoud be alphanumeric",
    });
  }
});

function makeJwt(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    email: user.email,
  };

  const secret = process.env.JWT_SECRET || "is it secret, is it safe?";

  const options = {
    expiresIn: "8h",
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
