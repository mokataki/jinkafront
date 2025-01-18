import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectAuth, loadUser } from '../../features/auth/authSlice';
import { Link } from 'react-router-dom';
import { FaRegUserCircle } from 'react-icons/fa';

const UserMenuDropdown = () => {
    const dispatch = useDispatch();
    const { user, email, name, isAuthenticated } = useSelector(selectAuth);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Dispatch loadUser to load user data from localStorage
    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout());
        setDropdownOpen(false); // Close the dropdown after logging out
    };

    // Close the dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Adjust dropdown position dynamically
    useEffect(() => {
        if (isDropdownOpen && dropdownRef.current) {
            const dropdown = dropdownRef.current;
            const rect = dropdown.getBoundingClientRect();

            // Ensure dropdown is fully visible horizontally
            if (rect.right > window.innerWidth) {
                dropdown.style.right = "0px";
                dropdown.style.left = "auto";
            }
            if (rect.left < 0) {
                dropdown.style.left = "0px";
                dropdown.style.right = "auto";
            }

            // Ensure dropdown is fully visible vertically
            if (rect.bottom > window.innerHeight) {
                dropdown.style.top = `-${rect.height}px`;
            }
        }
    }, [isDropdownOpen]);

    if (!isAuthenticated) {
        return (
            <Link to="/login" className="text-teal-400 hover:text-teal-500 transition">
                ورود
            </Link>
        );
    }

    return (
        <div className="relative">
            {/* Trigger Button with User Photo or Default Icon */}
            <button
                onClick={() => setDropdownOpen(!isDropdownOpen)}
                className="flex items-center text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition"
            >
                {user?.photo ? (
                    <img
                        src={user.photo}
                        alt={name || 'کاربر'}
                        className="w-8 h-8 rounded-full mr-2"
                    />
                ) : (
                    <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 mr-2">
                        <FaRegUserCircle size={24} />
                    </span>
                )}
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
                <div
                    ref={dropdownRef}
                    className="absolute right-0 z-50 mt-2 w-56 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                >
                    <div className="px-4 py-3">
                        <span className="block text-sm text-gray-900 dark:text-white">
                            {name || 'کاربر'}
                        </span>
                        <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                            {email || 'email@example.com'}
                        </span>
                    </div>
                    <ul className="py-2" aria-labelledby="user-menu-button">
                        <li>
                            <Link
                                to="/dashboard"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                                داشبورد
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/settings"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                                تنظیمات
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/earnings"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                                درآمدها
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-100 dark:hover:bg-red-600 dark:text-red-400 dark:hover:text-white"
                            >
                                خروج
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UserMenuDropdown;
