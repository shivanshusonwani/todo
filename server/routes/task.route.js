const express = require("express");
const router = express.Router();
const Task = require("../models/task.model");

const jwt = require("jsonwebtoken");

// middleware
const auth = (req, res, next) => {
	// Get token from header
	const authHeader = req.header("Authorization");

	// Check if no token
	if (!authHeader) {
		return res.status(401).json({
			success: false,
			message: "No token, authorization denied",
		});
	}

	// Check format: Bearer <token>
	if (!authHeader.startsWith("Bearer ")) {
		return res.status(401).json({
			success: false,
			message: "Invalid token format",
		});
	}

	const token = authHeader.replace("Bearer ", "").trim();

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded.user;
		next();
	} catch (error) {
		res.status(401).json({
			success: false,
			message: "Token is not valid or expired",
		});
	}
};

// Get all tasks
router.get("/", auth, async (req, res) => {
	try {
		const tasks = await Task.find({ user: req.user.id }).sort({
			createdAt: -1,
		});

		return res.status(200).json({
			success: true,
			count: tasks.length,
			tasks,
		});
	} catch (error) {
		console.error("Error fetching tasks:", error);
		return res.status(500).json({
			success: false,
			message: "Failed to fetch tasks",
		});
	}
});

// Add task
router.post("/", auth, async (req, res) => {
	try {
		const { task, important, completed, dueDate, list } = req.body;

		if (!task || task.trim().length === 0) {
			return res.status(400).json({
				success: false,
				message: "Task is required !",
			});
		}

		const newTask = await Task.create({
			task: task.trim(),
			important: important ?? false,
			completed: completed ?? false,
			dueDate: dueDate ?? null,
			list: list?.trim() || "Tasks",
			user: req.user.id,
		});

		res.status(201).json({
			success: true,
			data: newTask,
		});
	} catch (error) {
		console.error("Error creating task:", error);
		res.status(500).json({
			success: false,
			message: "Server error",
			error: error.message,
		});
	}
});

// Toggle complete
router.patch("/:id/complete", auth, async (req, res) => {
	try {
		const task = await Task.findOne({
			_id: req.params.id,
			user: req.user.id,
		});

		if (!task) {
			return res
				.status(404)
				.json({ success: false, message: "Task not found" });
		}

		task.completed = !task.completed; // toggle completed
		await task.save();

		res.json(task);
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: "Server error" });
	}
});

// Toggle important
router.patch("/:id/important", auth, async (req, res) => {
	try {
		const task = await Task.findOne({
			_id: req.params.id,
			user: req.user.id,
		});

		if (!task) {
			return res
				.status(404)
				.json({ success: false, message: "Task not found" });
		}

		task.important = !task.important; // toggle important
		await task.save();

		res.json(task);
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: "Server error" });
	}
});

// Delete task
router.delete("/:id", auth, async (req, res) => {
	try {
		const task = await Task.findOneAndDelete({
			_id: req.params.id,
			user: req.user.id,
		});

		if (!task)
			return res
				.status(404)
				.json({ success: false, message: "Task not found" });

		res.json({ success: true, message: "Deleted" });
	} catch (error) {
		console.error("Delete error:", error);
		res.status(500).json({ success: false, message: "Server error" });
	}
});

module.exports = router;
