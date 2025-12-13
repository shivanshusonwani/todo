import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
	const [formData, setFormData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const { login } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			await login(formData.email, formData.password);
			navigate("/todo");
		} catch (err) {
			setError(err.response?.data?.message || "Invalid email or password");
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

			{/* Login Card */}
			<div className='w-full max-w-md mt-15'>
				<div className='rounded-2xl shadow-xl p-6 md:p-8'>
					{/* Title */}
					<h2 className='text-3xl font-bold text-gray-900 text-center mb-4'>
						Welcome Back
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
						className='space-y-6'>
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
								className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all'
								placeholder='••••••••'
							/>
						</div>

						{/* Submit Button */}
						<button
							type='submit'
							disabled={loading}
							className='w-full bg-sky-500 hover:bg-sky-600 disabled:bg-sky-300 text-white font-bold py-3.5 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg'>
							{loading ? "Signing In..." : "Sign In"}
						</button>
					</form>

					{/* Sign Up Link */}
					<p className='mt-8 text-center text-gray-600'>
						Don't have an account?{" "}
						<Link
							to='/signup'
							className='font-medium text-sky-600 hover:text-sky-700 hover:underline transition-colors'>
							Sign up for free
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
