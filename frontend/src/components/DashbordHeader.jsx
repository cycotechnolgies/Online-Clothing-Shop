import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import ProfileImg from "../assets/ProfileImg.jpg";
import axios from "axios";

function DashboardHeader({ setSidebarOpen }) {
	const [isOpen, setIsOpen] = useState(false);
	const [userId, setUserId] = useState(null);
	const navigate = useNavigate();

	// useEffect(() => {
	// 	const token = localStorage.getItem("token");
	// 	if (token) {
	// 		try {
	// 			const decoded = jwtDecode(token);
	// 			console.log(decoded);
	// 			setUserId(decoded.userId);
	// 		} catch (error) {
	// 			console.error("Invalid token", error);
	// 		}
	// 	}
	// }, []);

	// const handleLogout = async () => {
	// 	try {
	// 		await axios.post(
	// 			"http://localhost:4000/api/auth/logout",
	// 			{},
	// 			{
	// 				headers: {
	// 					Authorization: `Bearer ${localStorage.getItem("token")}`,
	// 				},
	// 				withCredentials: true,
	// 			},
	// 		);

	// 		localStorage.removeItem("token"); // Remove token from storage

	// 		navigate("/login", { replace: true }); // Prevent going back

	// 		window.history.pushState(null, "", "/login"); // Push new state to block back
	// 	} catch (error) {
	// 		console.error("Logout failed", error.response?.data || error.message);
	// 	}
	// };

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<nav className='bg-white border-gray-200'>
			<div className='max-w-screen-xl flex flex-wrap items-center md:justify-end justify-between mx-auto p-4'>
				<button
					data-collapse-toggle='navbar-user'
					type='button'
					className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200'
					aria-controls='navbar-user'
					onClick={() => setSidebarOpen((prev) => !prev)}>
					<span className='sr-only'>Open main menu</span>
					<svg
						className='w-5 h-5'
						aria-hidden='true'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 17 14'>
						<path
							stroke='currentColor'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M1 1h15M1 7h15M1 13h15'
						/>
					</svg>
				</button>
				<div className='relative'>
					<button
						type='button'
						className='flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300'
						id='user-menu-button'
						aria-expanded={isOpen}
						aria-haspopup='true'
						onClick={toggleDropdown}>
						<span className='sr-only'>Open user menu</span>
						<img
							className='w-8 h-8 rounded-full'
							src={ProfileImg}
							alt='user photo'
						/>
					</button>
					{isOpen && (
						<div className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10'>
							<div className='px-4 py-2 text-gray-900 text-sm'>
								User ID: {userId}
							</div>
							<button
								onClick={handleLogout}
								className='w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100'>
								Logout
							</button>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
}

export default DashboardHeader;
