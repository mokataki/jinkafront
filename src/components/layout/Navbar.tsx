import { Link } from 'react-router-dom';
import { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    return (
        <>


            <nav
                className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 text-white ">
            <div className=" container mx-auto flex justify-between items-center py-4 px-6">
                {/* Logo */}
                <div className="text-2xl font-bold tracking-wide">
                    <Link to="/">برند من</Link>
                </div>

                {/* Desktop Links */}
                <ul className="hidden md:flex items-center space-x-reverse space-x-6">
                    <li>
                        <Link to="/" className="hover:text-teal-400 transition">خانه</Link>
                    </li>
                    <li>
                        <Link to="/about" className="hover:text-teal-400 transition">درباره ما</Link>
                    </li>
                    <li>
                        <Link to="/contact" className="hover:text-teal-400 transition">تماس با ما</Link>
                    </li>
                    <li>
                        <Link
                            to="/services"
                            className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-400 transition"
                        >
                            خدمات
                        </Link>
                    </li>
                </ul>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-teal-400 text-2xl focus:outline-none"
                    onClick={() => setMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <HiX /> : <HiMenu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <ul className="md:hidden bg-gray-800 text-center py-4 space-y-4">
                    <li>
                        <Link
                            to="/"
                            className="block text-white hover:text-teal-400 transition"
                            onClick={() => setMenuOpen(false)}
                        >
                            خانه
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/about"
                            className="block text-white hover:text-teal-400 transition"
                            onClick={() => setMenuOpen(false)}
                        >
                            درباره ما
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/contact"
                            className="block text-white hover:text-teal-400 transition"
                            onClick={() => setMenuOpen(false)}
                        >
                            تماس با ما
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/services"
                            className="block bg-teal-500 text-white px-4 py-2 rounded-lg mx-auto hover:bg-teal-400 transition"
                            onClick={() => setMenuOpen(false)}
                        >
                            خدمات
                        </Link>
                    </li>
                </ul>
            )}
        </nav>
            </>
    );
};

export default Navbar;
