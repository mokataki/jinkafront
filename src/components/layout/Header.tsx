// src/components/layout/Header.tsx
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="sticky fixed bg-gray-900 text-white ">
            <div className=" mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="text-3xl font-semibold tracking-tight text-teal-400">
                    <Link to="/">برند من</Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
