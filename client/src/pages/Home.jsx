import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { LuClipboardCheck } from "react-icons/lu";
import { MdOutlineDateRange } from "react-icons/md";
import { HiOutlineLockClosed } from "react-icons/hi";

const Home = () => {
	const { user } = useContext(AuthContext);

	return (
		<main className='min-h-screen flex justify-center items-center'>
			<div className='max-w-4xl py-15 px-10 flex flex-col justify-center items-center'>
				{/* Hero */}
				<h2 className='text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight'>
					Organize Your Life,
					<br />
					<span className='text-transparent bg-clip-text bg-linear-to-r from-sky-500 to-indigo-600'>
						One Task at a Time
					</span>
				</h2>
				<p className='text-xl md:text-2xl text-gray-600 text-center max-w-2xl mx-auto mb-8 leading-relaxed'>
					A clean, powerful todo app to help you stay focused and get things
					done.
				</p>

				{/* CTA */}
				<div className='flex flex-col sm:flex-row gap-6 justify-center items-center'>
					{!user ? (
						<>
							<Link to='/signup'>
								<button className='bg-linear-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold py-3 px-5 rounded-full text-lg shadow-xl transform hover:scale-105 transition-all duration-200 w-full sm:w-auto'>
									Get Started Free →
								</button>
							</Link>
							<Link to='/login'>
								<button className='bg-white text-sky-600 border-2 border-sky-500 hover:bg-sky-50 font-bold py-3 px-5 rounded-full text-lg shadow-md transform hover:scale-105 transition-all duration-200 w-full sm:w-auto'>
									Sign In
								</button>
							</Link>
						</>
					) : (
						<Link to='/todo'>
							<button className='bg-linear-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold py-3 px-5 rounded-full text-lg shadow-xl transform hover:scale-105 transition-all duration-200'>
								Go to Your Tasks →
							</button>
						</Link>
					)}
				</div>

				{/* Feature Cards */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-10'>
					<div className='rounded-2xl p-5 shadow-lg hover:shadow-xl transition-shadow text-center'>
						<div className='w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-3'>
							<LuClipboardCheck
								size={32}
								className='text-sky-600'
							/>
						</div>
						<h3 className='text-xl font-semibold text-gray-800 mb-3'>
							Simple & Fast
						</h3>
						<p className='text-gray-600'>
							Add, complete, and organize tasks in seconds.
						</p>
					</div>

					<div className='rounded-2xl p-5 shadow-lg hover:shadow-xl transition-shadow text-center'>
						<div className='w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-5'>
							<MdOutlineDateRange
								size={32}
								className='text-indigo-600'
							/>
						</div>
						<h3 className='text-xl font-semibold text-gray-800 mb-3'>
							Due Dates & Priority
						</h3>
						<p className='text-gray-600'>
							Never miss a deadline with smart reminders.
						</p>
					</div>

					<div className='rounded-2xl p-5 shadow-lg hover:shadow-xl transition-shadow text-center'>
						<div className='w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-5'>
							<HiOutlineLockClosed
								size={32}
								className='text-purple-600'
							/>
						</div>
						<h3 className='text-xl font-semibold text-gray-800 mb-3'>
							Secure & Private
						</h3>
						<p className='text-gray-600'>
							Your tasks are protected with secure authentication.
						</p>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Home;
