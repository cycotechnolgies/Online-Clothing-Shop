import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {jwtDecode} from "jwt-decode"; // Import jwt-decode
import { useMediaQuery } from "react-responsive";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../assets/OLLY LOGO.svg";
import {
	Airplay, User, BadgeDollarSign, PackageOpen,Shirt,ShoppingBag
} from "lucide-react";

const Sidebar = ({ open, setOpen }) => {
	let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
	const sidebarRef = useRef();
	const { pathname } = useLocation();
	const [userRole, setUserRole] = useState(""); // Store user role
	const [UID, setUID] = useState(""); // Store user role

	useEffect(() => {
		if (isTabletMid) {
			setOpen(false);
		} else {
			setOpen(true);
		}
	}, [isTabletMid, setOpen]);

	useEffect(() => {
		isTabletMid && setOpen(false);
	}, [pathname, isTabletMid, setOpen]);

	// Decode JWT and extract user role
	// useEffect(() => {
	// 	const token = localStorage.getItem("token"); // Get JWT token from local storage
	// 	if (token) {
	// 		try {
	// 			const decodedToken = jwtDecode(token);
	// 			console.log(decodedToken);
	// 			setUserRole(decodedToken.userType);
	// 			setUID(decodedToken.id);
	// 		} catch (error) {
	// 			console.error("Invalid token:", error);
	// 		}
	// 	}
	// }, []);

	console.log(userRole);

	const Nav_animation = isTabletMid
		? {
				open: { x: 0, width: "16rem", transition: { damping: 40 } },
				closed: { x: -250, width: 0, transition: { damping: 40, delay: 0.15 } },
		  }
		: {
				open: { width: "16rem", transition: { damping: 40 } },
				closed: { width: "4rem", transition: { damping: 40 } },
		  };

	return (
		<div>
			{/* Overlay for small screens */}
			<div
				onClick={() => setOpen(false)}
				className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 ${
					open ? "block" : "hidden"
				}`}></div>

			{/* Sidebar */}
			<motion.div
				ref={sidebarRef}
				variants={Nav_animation}
				initial={{ x: isTabletMid ? -250 : 0 }}
				animate={open ? "open" : "closed"}
				className='bg-white text-gray shadow-xl z-[999] max-w-[16rem] w-[16rem] overflow-hidden md:relative fixed h-screen'>
				{/* Sidebar Header */}
				<div className='flex items-center gap-2.5 font-medium border-b py-3 border-slate-300 mx-3'>
					<img
						src={Logo}
						width={60}
						alt='Logo'
					/>
				</div>

				{/* Navigation Links */}
				<li>
					<NavLink
						to="/dashboard"
						end
						className={({ isActive }) =>
						`flex items-center gap-2 px-3 py-2 mx-2 my-2 rounded transition-colors duration-200
						${isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100 hover:text-gray-600"}`
						}
					>
						<Airplay size={22}/>
						<span>Dashboard</span>
					</NavLink>
					</li>

					<li>
					<NavLink
						to="/dashboard/payments"
						className={({ isActive }) =>
						`flex items-center gap-2 px-3 py-2 m-2 rounded-md transition-colors duration-200
						${isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100 hover:text-gray-600"}`
						}
					>
						<BadgeDollarSign size={22} />
						<span>Payments</span>
					</NavLink>
					</li>

					<li>
					<NavLink
						to="/dashboard/orders"
						className={({ isActive }) =>
						`flex items-center gap-2 px-3 py-2 m-2 rounded-md transition-colors duration-200
						${isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100 hover:text-gray-600"}`
						}
					>
						<PackageOpen size={22} />
						<span>Orders</span>
					</NavLink>
					</li>

					<li>
					<NavLink
						to="/dashboard/products"
						className={({ isActive }) =>
						`flex items-center gap-2 px-3 py-2 m-2 rounded-md transition-colors duration-200
						${isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100 hover:text-gray-600"}`
						}
					>
						<Shirt size={22} />
						<span>Products</span>
					</NavLink>
					</li>

					<li>
					<NavLink
						to="/dashboard/categories"
						className={({ isActive }) =>
						`flex items-center gap-2 px-3 py-2 m-2 rounded-md transition-colors duration-200
						${isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100 hover:text-gray-600"}`
						}
					>
						<ShoppingBag size={22} />
						<span>Categories</span>
					</NavLink>
					</li>

					<li>
					<NavLink
						to="/dashboard/users"
						className={({ isActive }) =>
						`flex items-center gap-2 px-3 py-2 m-2 rounded-md transition-colors duration-200
						${isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100 hover:text-gray-600"}`
						}
					>
						<User size={22} />
						<span>Users</span>
					</NavLink>
					</li>

			</motion.div>
		</div>
	);
};

export default Sidebar;
