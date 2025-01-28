
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../store';
import {fetchArticleCategories} from "../../../features/categories/articleCategoryThunks.ts";

const ListArticleCategories = () => {
    const dispatch = useDispatch<AppDispatch>();

    // Selectors for categories, loading, and error
    const categories = useSelector((state: RootState) => state.categories.categories);
    const categoriesLoading = useSelector((state: RootState) => state.categories.status === 'loading');
    const error = useSelector((state: RootState) => state.categories.error);

    const [selectedCategory, setSelectedCategory] = useState<typeof categories[0] | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query

    useEffect(() => {
        dispatch(fetchArticleCategories({ fetchAll: true }));
    }, [dispatch]);

    const handleCategoryClick = (articleCategory: typeof categories[0]) => {
        setSelectedCategory(articleCategory);
    };

    const closeForm = () => {
        setSelectedCategory(null);
    };

    // Filter categories based on search query
    const filteredCategories = categories.filter((category) =>
        category.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.slug.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="p-6 bg-gray-50 rtl">
            <h1 className="text-lg font-bold mb-4 text-white font-dana">دسته‌بندی‌ها</h1>

            {/* Search Box */}
            <div className="mb-6">
                <input
                    type="text"
                    className="w-full p-4 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg shadow-lg font-yekan"
                    placeholder="جستجو کنید..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {categoriesLoading && <p className="text-center text-blue-500 font-shabnam">در حال بارگذاری...</p>}
            {error && <p className="text-center text-red-500 font-parasto">{error}</p>}
            {!categoriesLoading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredCategories.length > 0 ? (
                        filteredCategories.map((category) => (
                            <div
                                key={category.id}
                                className="p-4 bg-white border rounded-lg shadow-lg cursor-pointer hover:bg-indigo-50 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                onClick={() => handleCategoryClick(category)}
                            >
                                <h2 className="text-xl font-semibold text-indigo-600 mb-2 font-tanha">{category.categoryName}</h2>
                                <p className="text-gray-600 font-vazir"><strong>نام:</strong> {category.categoryName}</p>
                                <p className="text-gray-600 font-vazir"><strong>اسلاگ:</strong> {category.slug}</p>

                                {/* Parent Category */}
                                {category.parentId ? (
                                    <p className="text-gray-600 font-vazir">
                                        <strong>دسته‌بندی والد:</strong> {category.parentId ? category.categoryName : 'N/A'}
                                    </p>
                                ) : (
                                    <p className="text-gray-600 font-vazir">
                                        <strong>دسته‌بندی والد:</strong> {category.parentId ? 'No Parent Data' : 'N/A'}
                                    </p>
                                )}

                                {Array.isArray(category.children) && category.children.length > 0 && (
                                    <div>
                                        <p className="text-gray-600 font-vazir"><strong>فرزندان:</strong></p>
                                        <ul>
                                            {category.children.map((child) => (
                                                <li key={child.id} className="text-gray-700 font-vazir">{child.categoryName}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <p className="text-gray-600 font-vazir"><strong>تاریخ ایجاد:</strong> {new Date(category.createdAt).toLocaleDateString('fa-IR')}</p>
                                <p className="text-gray-600 font-vazir"><strong>تاریخ به‌روزرسانی:</strong> {new Date(category.updatedAt).toLocaleDateString('fa-IR')}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-600 font-vazir">هیچ دسته‌بندی‌ای با این شرایط یافت نشد.</p>
                    )}
                </div>
            )}

            {selectedCategory && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/3">
                        <h2 className="text-2xl font-semibold text-indigo-600 mb-4 font-tanha">{selectedCategory.categoryName}</h2>
                        <div className="space-y-2 mb-4">
                            <p className="font-vazir"><strong>نام:</strong> {selectedCategory.categoryName}</p>
                            <p className="font-vazir"><strong>اسلاگ:</strong> {selectedCategory.slug}</p>

                            {/* Parent Category for Selected Category */}
                            {selectedCategory.parentId ? (
                                <p className="font-vazir">
                                    <strong>دسته‌بندی والد:</strong> {selectedCategory.parentId ? selectedCategory.categoryName : 'N/A'}
                                </p>
                            ) : (
                                <p className="font-vazir">
                                    <strong>دسته‌بندی والد:</strong> {selectedCategory.parentId ? 'No Parent Data' : 'N/A'}
                                </p>
                            )}

                            {Array.isArray(selectedCategory.children) && selectedCategory.children.length > 0 && (
                                <div>
                                    <p className="font-vazir"><strong>فرزندان:</strong></p>
                                    <ul>
                                        {selectedCategory.children.map((child) => (
                                            <li key={child.id} className="text-gray-700 font-vazir">{child.categoryName}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <p className="font-vazir"><strong>تاریخ ایجاد:</strong> {new Date(selectedCategory.createdAt).toLocaleDateString('fa-IR')}</p>
                            <p className="font-vazir"><strong>تاریخ به‌روزرسانی:</strong> {new Date(selectedCategory.updatedAt).toLocaleDateString('fa-IR')}</p>
                        </div>
                        <button
                            className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out font-yekan"
                            onClick={closeForm}
                        >
                            بستن
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListArticleCategories;
