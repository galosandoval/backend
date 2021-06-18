const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {
  const string = req.body["string_to_cut"];
  console.log(string)

  const reduceString = (stringToCut) => {
    let trimmedString = stringToCut.trim().replace(/ /g, "");
    
    let stringCount = trimmedString.length;
    let ansStr = "";
    let beginIndex = 2;

    while (stringCount > 0) {
      const endIndex = beginIndex + 1;
      const stringToSlice = trimmedString;
      const stringToAdd = stringToSlice.slice(beginIndex, endIndex);
      ansStr = ansStr + stringToAdd;
      stringCount -= 3;
      beginIndex += 3;
    }

    return ansStr;
  };

  const ans = reduceString(string);
  res.status(201).json({ return_string: ans });
});

module.exports = router;
