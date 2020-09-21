const Howto = require("./howto-model");

module.exports = {
  validateHowtoId,
  validateHowto,
};

function validateHowtoId(req, res, next) {
  const id = req.params.id;
  Howto.findById(id)
    .then((howto) => {
      console.log(howto);
      if (howto) {
        req.howto = howto;
        next();
      } else {
        res.status(404).json({ message: "invalid howto id" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error 500!!!" });
    });
}

function validateHowto(req, res, next) {
  const { user_id, title, category, description } = req.body;
  console.log(req.body.username);
  if (!user_id || !title || !category || !description) {
    res.status(400).json({ message: "missing user_id, title, category or description" });
  } else {
    next();
  }
}
