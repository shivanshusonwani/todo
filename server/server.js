const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const taskRoute = require("./routes/task.route");
const authRoute = require("./routes/auth.route");
const cors = require("cors");

require("dotenv").config();
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/health", (req, res) => {
	res.status(201).json({ success: true });
});

// Routes
app.use("/task", taskRoute);
app.use("/auth", authRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
