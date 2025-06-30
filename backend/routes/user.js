const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/create-new-user", async (req, res) => {
  const { name, lastname, email, birthDate } = req.body;

  try {
    //If as user already exist it doesnt creates the user
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    // If it doesnt it creates the db isntance
    const newUser = await prisma.user.create({
      data: {
        name,
        lastname,
        email,
        birthDate,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

module.exports = router;
