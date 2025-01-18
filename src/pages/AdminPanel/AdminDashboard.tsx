import { Link } from 'react-router-dom';
import { FaBox, FaTags, FaEdit, FaList, FaClipboardList, FaCogs } from 'react-icons/fa';

const AdminDashboard = () => {
    return (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Dashboard Card for Products */}
            <Link
                to="/admin/products"
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center text-center hover:scale-105 transform transition-all"
            >
                <FaBox className="text-4xl text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">محصولات</h3>
                <p className="text-gray-600 dark:text-gray-400">مدیریت محصولات شما</p>
            </Link>

            {/* Dashboard Card for Articles */}
            <Link
                to="/admin/articles"
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center text-center hover:scale-105 transform transition-all"
            >
                <FaClipboardList className="text-4xl text-green-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">مقالات</h3>
                <p className="text-gray-600 dark:text-gray-400">مدیریت مقالات شما</p>
            </Link>

            {/* Dashboard Card for Tags */}
            <Link
                to="/admin/tags"
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center text-center hover:scale-105 transform transition-all"
            >
                <FaTags className="text-4xl text-yellow-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">تگ‌ها</h3>
                <p className="text-gray-600 dark:text-gray-400">مدیریت تگ‌ها</p>
            </Link>

            {/* Dashboard Card for Categories */}
            <Link
                to="/admin/categories"
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center text-center hover:scale-105 transform transition-all"
            >
                <FaList className="text-4xl text-red-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">دسته‌بندی‌ها</h3>
                <p className="text-gray-600 dark:text-gray-400">مدیریت دسته‌بندی‌ها</p>
            </Link>

            {/* Dashboard Card for Colors */}
            <Link
                to="/admin/colors"
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center text-center hover:scale-105 transform transition-all"
            >
                <FaCogs className="text-4xl text-purple-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">رنگ‌ها</h3>
                <p className="text-gray-600 dark:text-gray-400">مدیریت رنگ‌ها</p>
            </Link>

            {/* Dashboard Card for Brands */}
            <Link
                to="/admin/brands"
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center text-center hover:scale-105 transform transition-all"
            >
                <FaEdit className="text-4xl text-orange-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">برند‌ها</h3>
                <p className="text-gray-600 dark:text-gray-400">مدیریت برند‌ها</p>
            </Link>
        </div>
    );
};

export default AdminDashboard;
