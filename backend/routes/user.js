const express = require("express");
const router = express.Router();

router.post("/create-new-user", (req, res) => {
  const { email } = req.body;

  res.send("Aaaa");
});

module.exports = router;
