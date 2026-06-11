const express = require("express");
const cors = require("cors");
const activityRoutes = require("./routes/activityRoutes");
const desktopRoutes = require("./routes/desktopRoutes");
const systemRoutes = require("./routes/systemRoutes");
const futureSelfRoutes = require("./routes/futureSelfRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "HumanOS Backend Running",
    tagline: "Your mind, running in real time."
  });
});

app.use("/api/activity", activityRoutes);
app.use("/api/desktop", desktopRoutes);
app.use("/api/system", systemRoutes);
app.use("/api/future-self", futureSelfRoutes);

module.exports = app;