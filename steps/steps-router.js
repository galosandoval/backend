const express = require("express");
const router = express.Router();

const { validateStep, validateStepId } = require("./steps-middleware");
const Steps = require("./steps-model");

router.get("/", (req, res) => {
  Steps.find()
    .then((steps) => {
      res.status(200).json({ steps });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.get("/:id", validateStepId, (req, res) => {
  const id = req.params.id;
  Steps.findById(id)
    .then((steps) => {
      res.status(200).json({ steps });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.post("/", validateStep,(req, res) => {
  const newHowto = req.body;
  Steps.add(newHowto)
    .then((addition) => {
      res
        .status(201)
        .json({ message: "Congrats, you added a new step", addition });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.put("/:id", validateStepId, validateStep, (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  Steps.update(id, changes)
    .then((howto) => {
      res
        .status(200)
        .json({ message: `Step with the id ${id} was successfully changed` });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.delete("/:id", validateStepId, (req, res) => {
  const id = req.params.id;

  Steps.remove(id)
    .then((deleted) => {
      res.status(204).end();
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

module.exports = router;
