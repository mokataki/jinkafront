import { useState } from "react";
import { RiMenu2Line } from "react-icons/ri";
import { FaTachometerAlt, FaPlus, FaEdit, FaTrash, FaChevronDown, FaList } from "react-icons/fa";
import { Link } from "react-router-dom"; // Add this import for routing

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isProductsOpen, setIsProductsOpen] = useState(false);
    const [isArticlesOpen, setIsArticlesOpen] = useState(false);
    const [isTagsOpen, setIsTagsOpen] = useState(false);
    const [isColorsOpen, setIsColorsOpen] = useState(false);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const [isArticleCategoriesOpen, setIsArticleCategoriesOpen] = useState(false);

    const [isBrandsOpen, setIsBrandsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleSection = (sectionSetter: React.Dispatch<React.SetStateAction<boolean>>) => {
        sectionSetter((prevState) => !prevState);
    };

    return (
        <>
            {/* Sidebar Toggle Button for small screens */}
            <button
                onClick={toggleSidebar}
                className="fixed top-5 left-24
                md:left-32 md:hidden z-50 inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
                <span className="sr-only">Open sidebar</span>
                <RiMenu2Line className="w-6 h-6" aria-hidden="true" />
            </button>


            {/* Sidebar */}
            <aside
                className={`fixed top-20 right-0 z-40 w-64 h-[calc(100vh-5rem)] pt-4 transition-transform ${
                    isSidebarOpen ? "translate-x-0" : "translate-x-full"
                } bg-white border-l border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <ul className="space-y-2 font-medium text-right">
                        {/* Dashboard */}
                        <li>
                            <Link
                                to="/admin"
                                className="flex items-center justify-between p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <span className="ml-3">داشبورد</span>
                                <FaTachometerAlt className="text-lg text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            </Link>
                        </li>

                        {/* Products */}
                        <li>
                            <button
                                onClick={() => toggleSection(setIsProductsOpen)}
                                className="flex items-center justify-between w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <span className="ml-3">محصولات</span>
                                <FaChevronDown
                                    className={`transition-transform ${isProductsOpen ? "rotate-180" : ""} text-gray-500 dark:text-gray-400`}
                                />
                            </button>
                            {isProductsOpen && (
                                <ul className="pr-4 mt-2 space-y-2 border-r border-gray-200 dark:border-gray-700">
                                    <li>
                                        <Link
                                            to="/admin/products"
                                            className="flex items-center justify-between p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                        >
                                            <span className="ml-3"> محصولات</span>
                                            <FaList className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/admin/products/create"
                                            className="flex items-center justify-between p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                        >
                                            <span className="ml-3">ایجاد محصول</span>
                                            <FaPlus className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/admin/products/edit"
                                            className="flex items-center justify-between p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                        >
                                            <span className="ml-3">تغییر محصول</span>
                                            <FaEdit className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/admin/products/delete"
                                            className="flex items-center justify-between p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                        >
                                            <span className="ml-3">حذف محصول</span>
                                            <FaTrash className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>

                        {/* Articles */}
                        <li>
                            <button
                                onClick={() => toggleSection(setIsArticlesOpen)}
                                className="flex items-center justify-between w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <span className="ml-3">مقالات</span>
                                <FaChevronDown
                                    className={`transition-transform ${isArticlesOpen ? "rotate-180" : ""} text-gray-500 dark:text-gray-400`}
                                />
                            </button>
                            {isArticlesOpen && (
                                <ul className="pr-4 mt-2 space-y-2 border-r border-gray-200 dark:border-gray-700">
                                    <li>
                                        <Link
                                            to="/admin/articles"
                                            className="flex items-center justify-between p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                        >
                                            <span className="ml-3"> مقالات</span>
                                            <FaList className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/admin/articles/create"
                                            className="flex items-center justify-between p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                        >
                                            <span className="ml-3">ایجاد مقاله</span>
                                            <FaPlus className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/admin/articles/edit"
                                            className="flex items-center justify-between p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                        >
                                            <span className="ml-3">تغییر مقاله</span>
                                            <FaEdit className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/admin/articles/delete"
                                            className="flex items-center justify-between p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                        >
                                            <span className="ml-3">حذف مقاله</span>
                                            <FaTrash className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>

                        {/* Other Sections */}
                        {[{
                            name: "برچسب ", state: isTagsOpen, setState: setIsTagsOpen, path: "/admin/tags"
                        }, {
                            name: "رنگ‌", state: isColorsOpen, setState: setIsColorsOpen, path: "/admin/colors"
                        }, {
                            name: "دسته‌بندی‌ مقاله ", state: isArticleCategoriesOpen, setState: setIsArticleCategoriesOpen, path: "/admin/articles-category"

                        }, {
                            name: "دسته‌بندی‌ محصول", state: isCategoriesOpen, setState: setIsCategoriesOpen, path: "/admin/categories"
                        }, {
                            name: "برند‌", state: isBrandsOpen, setState: setIsBrandsOpen, path: "/admin/brands"
                        }].map((section) => (
                            <li key={section.name}>
                                <button
                                    onClick={() => toggleSection(section.setState)}
                                    className="flex items-center justify-between w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <span className="ml-3">{section.name}</span>
                                    <FaChevronDown
                                        className={`transition-transform ${section.state ? "rotate-180" : ""} text-gray-500 dark:text-gray-400`}
                                    />
                                </button>
                                {section.state && (
                                    <ul className="pr-4 mt-2 space-y-2 border-r border-gray-200 dark:border-gray-700">
                                        <li>
                                            <Link
                                                to={`${section.path}`}
                                                className="flex items-center justify-between p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                            >
                                                <span className="ml-3"> {section.name}ها </span>
                                                <FaList className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to={`${section.path}/create`}
                                                className="flex items-center justify-between p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                            >
                                                <span className="ml-3">ایجاد {section.name}جدید</span>
                                                <FaPlus className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to={`${section.path}/edit`}
                                                className="flex items-center justify-between p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                            >
                                                <span className="ml-3">تغییر {section.name}</span>
                                                <FaEdit className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to={`${section.path}/delete`}
                                                className="flex items-center justify-between p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                            >
                                                <span className="ml-3">حذف {section.name}</span>
                                                <FaTrash className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
