const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Aaaa");
});

router.post("/create-new-appointment", (req, res) => {
  const {} = req.body;
});

module.exports = router;
