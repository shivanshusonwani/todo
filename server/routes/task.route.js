const express = require("express");
const router = express.Router();
const Task = require("../models/task.model");

// Get all tasks
router.get("/", async (req, res) => {
	try {
		const tasks = await Task.find().sort({ createdAt: -1 });

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
router.post("/", async (req, res) => {
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
router.patch("/:id/complete", async (req, res) => {
	try {
		const task = await Task.findById(req.params.id);

		if (!task) {
			return res.status(404).json({ message: "Task not found" });
		}

		task.completed = !task.completed; // toggle completed
		await task.save();

		res.json(task);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
});

// Toggle important
router.patch("/:id/important", async (req, res) => {
	try {
		const task = await Task.findById(req.params.id);

		if (!task) {
			return res.status(404).json({ message: "Task not found" });
		}

		task.important = !task.important; // toggle important
		await task.save();

		res.json(task);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
});

// Delete task
router.delete("/:id", async (req, res) => {
	try {
		const task = await Task.findByIdAndDelete(req.params.id);

		if (!task) return res.status(404).json({ message: "Task not found" });

		res.json({ message: "Deleted" });
	} catch (error) {
		console.error("Delete error:", error);
		res.status(500).json({ message: "Server error" });
	}
});

module.exports = router;
