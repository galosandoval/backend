const Steps = require("./steps-model");

module.exports = {
  validateStepId,
  validateStep,
};

function validateStepId(req, res, next) {
  const id = req.params.id;
  Steps.findById(id)
    .then((step) => {
      console.log(step);
      if (step) {
        req.step = step;
        next();
      } else {
        res.status(404).json({ message: "invalid step id" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error 500!!!" });
    });
}

function validateStep(req, res, next) {
  const { howto_id, description } = req.body;
  console.log(req.body.username);
  if (!howto_id || !description) {
    res.status(400).json({ message: "missing howto_id, or description" });
  } else {
    next();
  }
}
