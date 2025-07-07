const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/get-user-by-email/:userEmail", async (req, res) => {
  const email = req.params.userEmail;

  try {
    const getUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!getUser) {
      res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(getUser);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error searching for the user",
      details: error.message,
    });
  }
});

router.post("/create-new-user", async (req, res) => {
  const { name, lastname, email, birthDate, role } = req.body;

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
        role,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

router.put("/update-user-info", async (req, res) => {
  try {
    const { email } = req.body;
    const updateUser = await prisma.user.update({
      where: {
        email: email,
      },
      data: { ...req.body, updatedAt: new Date() },
    });

    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error updating the user",
      details: error.message,
    });
  }
});

router.delete("/delete-user", async (req, res) => {
  try {
    const { email } = req.body;
    const deleteUser = await prisma.user.delete({
      where: {
        email: email,
      },
    });

    res.status(204).json({ message: "User deleted correctly" });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error deleting the user",
      details: error.message,
    });
  }
});

module.exports = router;
