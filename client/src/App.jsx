import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Todo from "./pages/Todo";

function App() {
	return (
		<>
			<Routes>
				{/* Public routes */}
				<Route
					path='/'
					element={<Home />}
				/>
				<Route
					path='/login'
					element={<Login />}
				/>
				<Route
					path='/signup'
					element={<Signup />}
				/>

				{/* Protected routes - only accessible when logged in */}
				<Route
					path='/todo'
					element={
						<ProtectedRoute>
							<Todo />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</>
	);
}

export default App;
