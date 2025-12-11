const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
	{
		task: {
			type: String,
			required: true,
			trim: true,
		},
		completed: {
			type: Boolean,
			default: false,
		},
		important: {
			type: Boolean,
			default: false,
		},
		dueDate: {
			type: Date,
			default: null,
		},
		list: {
			type: String,
			default: "Tasks",
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
