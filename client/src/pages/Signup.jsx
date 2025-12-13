import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const { signup } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			await signup(formData.name, formData.email, formData.password);
			navigate("/todo");
		} catch (err) {
			setError(
				err.response?.data?.message || "Signup failed. Please try again."
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center px-4'>
			<header className='absolute top-0 left-0 right-0 bg-sky-400 text-white px-6 py-4 shadow-md'>
				<div className='max-w-7xl mx-auto flex justify-between items-center'>
					<h1 className='text-2xl font-bold'>To Do</h1>
					<Link
						to='/'
						className='text-sm hover:underline cursor-pointer'>
						← Back to Home
					</Link>
				</div>
			</header>

			{/* Signup Card */}
			<div className='w-full max-w-md mt-15'>
				<div className='rounded-2xl shadow-xl p-6 md:p-8'>
					<h2 className='text-3xl font-bold text-gray-900 text-center mb-4'>
						Create Your Account
					</h2>

					{/* Error Message */}
					{error && (
						<div className='mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm text-center'>
							{error}
						</div>
					)}

					{/* Form */}
					<form
						onSubmit={handleSubmit}
						className='space-y-3'>
						<div>
							<label
								htmlFor='name'
								className='block text-sm font-medium text-gray-700 mb-2'>
								Full Name
							</label>
							<input
								type='text'
								id='name'
								name='name'
								value={formData.name}
								onChange={handleChange}
								required
								className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all'
								placeholder='Enter your name...'
							/>
						</div>

						<div>
							<label
								htmlFor='email'
								className='block text-sm font-medium text-gray-700 mb-2'>
								Email Address
							</label>
							<input
								type='email'
								id='email'
								name='email'
								value={formData.email}
								onChange={handleChange}
								required
								className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all'
								placeholder='you@example.com'
							/>
						</div>

						<div>
							<label
								htmlFor='password'
								className='block text-sm font-medium text-gray-700 mb-2'>
								Password
							</label>
							<input
								type='password'
								id='password'
								name='password'
								value={formData.password}
								onChange={handleChange}
								required
								minLength='6'
								className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all'
								placeholder='••••••••'
							/>
							<p className='text-xs text-gray-500 mt-2'>Minimum 6 characters</p>
						</div>

						{/* Submit Button */}
						<button
							type='submit'
							disabled={loading}
							className='w-full bg-sky-500 hover:bg-sky-600 disabled:bg-sky-300 text-white font-bold py-3.5 rounded-lg transition-all duration-200 transform cursor-pointer shadow-lg'>
							{loading ? "Creating Account..." : "Sign Up"}
						</button>
					</form>

					{/* Login Link */}
					<p className='mt-8 text-center text-gray-600'>
						Already have an account?{" "}
						<Link
							to='/login'
							className='font-medium text-sky-600 hover:text-sky-700 hover:underline transition-colors'>
							Sign in here
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Signup;
