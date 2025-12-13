import { useState, useEffect, useContext } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import {
	FaPlus,
	FaCheck,
	FaRegStar,
	FaRegTrashAlt,
	FaStar,
} from "react-icons/fa";
import { FiCalendar, FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { AuthContext } from "../context/AuthContext";

const API_URL = "/task";

export default function Home() {
	const { user, logout } = useContext(AuthContext);
	const [todos, setTodos] = useState([]);
	const [activeView, setActiveView] = useState("tasks");
	const [newTodo, setNewTodo] = useState("");
	const [newDueDate, setNewDueDate] = useState(null);
	const [sidebarOpen, setSidebarOpen] = useState(false);

	// Fetch todos from backend
	const fetchTodos = async () => {
		try {
			const response = await axios.get("/task");
			setTodos(response.data.tasks);
			console.log(response.data.tasks);
		} catch (error) {
			console.error("Error fetching todos:", error);
		}
	};

	useEffect(() => {
		fetchTodos();
	}, [newTodo]);

	const addTodo = async () => {
		if (!newTodo.trim()) return;

		try {
			const res = await axios.post(API_URL, {
				task: newTodo,
				important: false,
				completed: false,
				dueDate: newDueDate ? newDueDate.toISOString() : null,
			});
			setTodos([res.data, ...todos]);
			setNewTodo("");
			setNewDueDate(null);
		} catch (error) {
			console.error("Error adding todo", error);
		}
	};

	const toggleComplete = async (id) => {
		const todo = todos.find((t) => t._id === id);
		if (!todo) return;
		try {
			const response = await axios.patch(`${API_URL}/${id}/complete`, {
				completed: !todo.completed,
			});
			setTodos(todos.map((t) => (t._id === id ? response.data : t)));
		} catch (err) {
			console.error("Error toggling complete:", err);
		}
	};

	const toggleImportant = async (id) => {
		const todo = todos.find((t) => t._id === id);
		if (!todo) return;
		try {
			const response = await axios.patch(`${API_URL}/${id}/important`, {
				important: !todo.important,
			});
			setTodos(todos.map((t) => (t._id === id ? response.data : t)));
		} catch (err) {
			console.error("Error toggling important:", err);
		}
	};

	const deleteTodo = async (id) => {
		try {
			await axios.delete(`task/${id}`);
			setTodos(todos.filter((t) => t._id !== id));
		} catch (err) {
			console.error("Error deleting todo:", err);
		}
	};

	const changeView = (view) => {
		setActiveView(view);
		setSidebarOpen(false);
	};

	const getFilteredTodos = () => {
		switch (activeView) {
			case "important":
				return todos.filter((todo) => todo.important);
			case "planned":
				return todos.filter((todo) => todo.dueDate);
			default:
				return todos;
		}
	};

	const filteredTodos = getFilteredTodos();

	return (
		<div className='w-screen h-screen flex flex-col'>
			{/* Header */}
			<header className='bg-sky-400 text-white px-6 py-4 flex justify-between items-center gap-2'>
				<div className='flex gap-2'>
					<button
						onClick={() => setSidebarOpen(!sidebarOpen)}
						className='lg:hidden text-white hover:bg-sky-600 p-2 rounded-lg transition-colors'>
						{sidebarOpen ? <RxCross2 size={24} /> : <FiMenu size={24} />}
					</button>
					<h1 className='text-2xl font-bold'>To Do</h1>
				</div>

				<button
					onClick={logout}
					className='bg-sky-600 hover:bg-sky-700 px-4 py-2 rounded-lg transition-colors text-sm font-medium'>
					Logout
				</button>
			</header>

			<div className='flex flex-1 overflow-hidden relative'>
				{/* Sidebar Navigation */}
				<nav
					className={`bg-slate-50 w-60 border-r border-slate-200 p-4 absolute lg:relative h-full z-10 transition-transform duration-300 ${
						sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
					}`}>
					<div className='space-y-2'>
						{["tasks", "important", "planned"].map((view) => (
							<button
								key={view}
								onClick={() => changeView(view)}
								className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
									activeView === view
										? "bg-sky-100 text-sky-700 font-medium"
										: "text-slate-700 hover:bg-slate-100"
								}`}>
								{view === "tasks" && <FaCheck size={20} />}
								{view === "important" && <FaRegStar size={20} />}
								{view === "planned" && <FiCalendar size={20} />}
								<span className='capitalize'>{view}</span>
							</button>
						))}
					</div>
				</nav>

				{/* Main Content */}
				<main className='flex-1 bg-white overflow-auto'>
					{/* Overlay for mobile */}
					{sidebarOpen && (
						<div
							onClick={() => setSidebarOpen(false)}
							className='fixed h-full w-full bg-black/50 z-5 lg:hidden'
						/>
					)}
					<div className='max-w-3xl mx-auto p-6'>
						{/* View Title */}
						<h2 className='text-3xl font-bold text-slate-800 mb-6 capitalize'>
							{activeView}
						</h2>

						{/* Add New Todo */}
						{activeView === "tasks" && (
							<div className='flex flex-col gap-3 mb-8 bg-slate-50 p-5 rounded-xl border border-slate-400'>
								<input
									type='text'
									value={newTodo}
									onChange={(e) => setNewTodo(e.target.value)}
									onKeyDown={(e) => e.key === "Enter" && addTodo()}
									placeholder='What needs to be done?'
									className='px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-lg'
								/>

								<div className='flex items-center justify-between gap-4'>
									<DatePicker
										selected={newDueDate}
										onChange={(date) => setNewDueDate(date)}
										placeholderText='Add due date (optional)'
										className='px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500'
										isClearable
										showPopperArrow={false}
									/>
									<button
										onClick={addTodo}
										className='bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors cursor-pointer'>
										<FaPlus /> Add Task
									</button>
								</div>
							</div>
						)}

						{/* Todo List */}
						<div className='space-y-2'>
							{filteredTodos.length === 0 ? (
								<p className='text-slate-400 text-center py-12'>
									No tasks to show
								</p>
							) : (
								filteredTodos.map((todo) => (
									<div
										key={todo._id}
										className='flex items-center justify-between gap-5 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group'>
										{/* Mark Complete */}
										<div className='flex py-1 gap-3'>
											<button
												onClick={() => toggleComplete(todo._id)}
												className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
													todo.completed
														? "bg-sky-500 border-sky-500"
														: "border-slate-300 hover:border-sky-500"
												}`}>
												{todo.completed && (
													<FaCheck
														size={16}
														className='text-white'
													/>
												)}
											</button>

											{/* Text */}
											<span
												className={`flex-1 ${
													todo.completed
														? "line-through text-slate-400"
														: "text-slate-700"
												}`}>
												{todo.task}
											</span>
										</div>

										<div className='flex justify-end w-40 gap-4'>
											{/* Due Date */}
											{todo.dueDate && (
												<div className='relative flex flex-1 justify-center items-center gap-2 bg-amber-100 text-amber-800 rounded-lg text-sm px-2 py-1 z-0'>
													<FiCalendar size={16} />
													{new Date(todo.dueDate).toLocaleDateString("en-US", {
														month: "short",
														day: "numeric",
													})}
												</div>
											)}

											{/* Mark Important */}
											<button onClick={() => toggleImportant(todo._id)}>
												{todo.important ? (
													<FaStar
														size={25}
														className='fill-yellow-400'
													/>
												) : (
													<FaRegStar
														size={25}
														className='fill-slate-400'
													/>
												)}
											</button>

											{/* Delete Button */}
											<button
												onClick={() => deleteTodo(todo._id)}
												className='text-slate-400 hover:text-red-500'>
												<FaRegTrashAlt size={20} />
											</button>
										</div>
									</div>
								))
							)}
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
