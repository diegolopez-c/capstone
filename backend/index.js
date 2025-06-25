const express = require("express");
const app = express();
require("dotenv").config();
const { auth } = require("express-openid-connect");
const { requiresAuth } = require("express-openid-connect");
const port = process.env.PORT || 8080;

//Routes importation
const appointmentRoutes = require("./routes/appointment");
const medicalHistoryRoutes = require("./routes/medicalHistory");
const medicineRoutes = require("./routes/medicine");
const prescriptionRoutes = require("./routes/prescription");
const userRoutes = require("./routes/user");

const config = {
  authRequired: false,
  auth0Logout: true,
  secret:
    process.env.AUTH_SECRET ||
    "a long, randomly-generated string stored in env",
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

app.use(express.json());

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

//Routing
app.use("/appointment", appointmentRoutes);
app.use("/medical-history", medicalHistoryRoutes);
app.use("/medicine", medicineRoutes);
app.use("/prescription", prescriptionRoutes);
app.use("/user", userRoutes);

// Authetntication
app.get("/", (req, res) => {
  console.log(JSON.stringify(req.oidc.user));
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
