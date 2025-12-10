import { useState } from "react";
import { FaPlus, FaCheck, FaRegStar } from "react-icons/fa";
import { FiCalendar, FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

export default function TodoApp() {
	const [activeView, setActiveView] = useState("tasks");
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const changeView = (view) => {
		setActiveView(view);
		setSidebarOpen(false);
	};

	return (
		<div className='w-screen h-screen flex flex-col'>
			{/* Header */}
			<header className='bg-sky-400 text-white px-6 py-4 flex items-center gap-2'>
				<button
					onClick={() => setSidebarOpen(!sidebarOpen)}
					className='lg:hidden text-white hover:bg-sky-600 p-2 rounded-lg transition-colors'>
					{sidebarOpen ? <RxCross2 size={24} /> : <FiMenu size={24} />}
				</button>
				<h1 className='text-2xl font-bold'>To Do</h1>
			</header>

			<div className='flex flex-1 overflow-hidden relative'>
				{/* Sidebar Navigation */}
				<nav
					className={`bg-slate-50 w-60 border-r border-slate-200 p-4 absolute lg:relative h-full z-10 transition-transform duration-300 ${
						sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
					}`}>
					<div className='space-y-2'>
						<button
							onClick={() => changeView("tasks")}
							className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
								activeView === "tasks"
									? "bg-sky-100 text-sky-700 font-medium"
									: "text-slate-700 hover:bg-slate-100"
							}`}>
							<FaCheck size={20} />
							Tasks
						</button>
						<button
							onClick={() => changeView("important")}
							className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
								activeView === "important"
									? "bg-sky-100 text-sky-700 font-medium"
									: "text-slate-700 hover:bg-slate-100"
							}`}>
							<FaRegStar size={20} />
							Important
						</button>
						<button
							onClick={() => changeView("planned")}
							className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
								activeView === "planned"
									? "bg-sky-100 text-sky-700 font-medium"
									: "text-slate-700 hover:bg-slate-100"
							}`}>
							<FiCalendar size={20} />
							Planned
						</button>
					</div>
				</nav>

				{/* Main Content */}
				<main className='flex-1 bg-white overflow-auto'>
					{/* Overlay for mobile */}
					{sidebarOpen && (
						<div
							onClick={() => setSidebarOpen(false)}
							className='fixed h-full w-full bg-black/50 z-0 lg:hidden'
						/>
					)}
					<div className='max-w-3xl mx-auto p-6'>
						{/* View Title */}
						<h2 className='text-3xl font-bold text-slate-800 mb-6 capitalize'>
							{activeView}
						</h2>

						{/* Add Todo Input */}
						<div
							className={`flex gap-2 mb-6 ${
								activeView !== "tasks" ? "hidden" : "flex"
							}`}>
							<input
								type='text'
								placeholder='Add a task...'
								className='flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400'
							/>
							<button className='bg-sky-400 text-white px-6 py-3 rounded-lg hover:bg-sky-500 cursor-pointer transition-colors flex items-center gap-2'>
								<FaPlus size={20} />
								Add
							</button>
						</div>

						{/* Todo List */}
						<div className='space-y-2'>
							<p className='text-slate-400 text-center py-12 select-none'>
								No tasks to show
							</p>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
