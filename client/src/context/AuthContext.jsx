import { createContext, useState, useEffect } from "react";
import axios from "axios";

const api = import.meta.env.VITE_API_URL;

axios.defaults.headers.post["Content-Type"] = "application/json";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
			setUser({ token });
		}
		setLoading(false);
	}, []);

	const login = async (email, password) => {
		const res = await axios.post(`${api}/auth/login`, { email, password });
		localStorage.setItem("token", res.data.token);
		axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
		setUser({ token: res.data.token });
	};

	const signup = async (name, email, password) => {
		const res = await axios.post(`${api}/auth/signup`, {
			name,
			email,
			password,
		});
		localStorage.setItem("token", res.data.token);
		axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
		setUser({ token: res.data.token });
	};

	const logout = () => {
		localStorage.removeItem("token");
		delete axios.defaults.headers.common["Authorization"];
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, loading, login, signup, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
