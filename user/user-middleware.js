const User = require("./user-model");

module.exports = {
  validateUserId,
  validateUser,
};

function validateUserId(req, res, next) {
  const id = req.params.id;
  User.findById(id)
    .then((user) => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({ message: "invalid user id" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error 500!!!" });
    });
}

function validateUser(req, res, next) {
  const {username, password, email} = req.body;
  console.log(req.body.username);
  if (!password){
    res
      .status(400)
      .json({ error: "missing username, email or password" })
      .end();
  }
  next();
}
