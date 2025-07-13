const express = require("express");
const app = express();
require("dotenv").config();
const { auth } = require("express-openid-connect");
const { requiresAuth } = require("express-openid-connect");
const port = process.env.PORT || 8080;
const frontendURL = process.env.FRONTEND_URL;
const cron = require("node-cron");
const http = require("http");
const { Server } = require("socket.io");

//Cors
const cors = require("cors");

//Routes importation
const appointmentRoutes = require("./routes/appointment");
const medicalHistoryRoutes = require("./routes/medicalHistory");
const medicineRoutes = require("./routes/medicine");
const prescriptionRoutes = require("./routes/prescription");
const userRoutes = require("./routes/user");
const availabilityRoutes = require("./routes/availability");

//Auth0 Config
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

app.use(express.json());

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

//Configure cors
app.use(
  cors({
    origin: frontendURL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

//Routing
app.use("/appointment", appointmentRoutes);
app.use("/medical-history", medicalHistoryRoutes);
app.use("/medicine", medicineRoutes);
app.use("/prescription", prescriptionRoutes);
app.use("/user", userRoutes);
app.use("/availability", availabilityRoutes);

//Socket.io config
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

//Socket IO functionality
io.on("connection", (socket) => {
  socket.on("send_message", (data) => {});
});

cron.schedule("* * * * *", () => {});

// Authetntication
app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated());
});

app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
