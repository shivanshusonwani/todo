const express = require("express");
const connectDB = require("./config/db");
const taskRoute = require("./routes/task.route");

require("dotenv").config();
connectDB();

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
	res.status(201).json({ success: true });
});

app.use("/task", taskRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
