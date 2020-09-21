const express = require("express");
const router = express.Router();

const { validateHowto, validateHowtoId } = require("./howto-middleware");
const Howto = require("./howto-model");

router.get("/", (req, res) => {
  Howto.find()
    .then((howto) => {
      res.status(200).json({ howto });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.get("/:id", validateHowtoId, (req, res) => {
  const id = req.params.id;
  Howto.findById(id)
    .then((howto) => {
      res.status(200).json({ howto });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.get('/:id/steps', (req,res)=>{
  const id = req.params.id

  Howto.findHowToSteps(id).then(howto_steps =>{
    res.status(200).json(howto_steps)
  })
})

router.post("/", (req, res) => {
  const newHowto = req.body;
  Howto.add(newHowto)
    .then((addition) => {
      res
        .status(201)
        .json({ message: "Congrats, you added a new howto", addition });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.put("/:id", validateHowtoId, validateHowto, (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  Howto.update(id, changes)
    .then((howto) => {
      res
        .status(200)
        .json({ message: `Howto with the id ${id} was successfully changed` });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.delete("/:id", validateHowtoId, (req, res) => {
  const id = req.params.id;

  Howto.remove(id)
    .then((deleted) => {
      res.status(204).end();
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

module.exports = router;
