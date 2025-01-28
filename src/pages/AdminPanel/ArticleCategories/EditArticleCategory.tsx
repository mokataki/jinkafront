import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../store';
import {fetchArticleCategories, updateArticleCategory} from "../../../features/categories/articleCategoryThunks.ts";

const EditArticleCategory = () => {
    const dispatch = useDispatch<AppDispatch>();

    const categories = useSelector((state: RootState) => state.categories.categories);
    const categoriesLoading = useSelector((state: RootState) => state.categories.status === 'loading');
    const error = useSelector((state: RootState) => state.categories.error);

    const [selectedCategory, setSelectedCategory] = useState<typeof categories[0] | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [formData, setFormData] = useState<Partial<typeof categories[0]>>({
        categoryName: '',
        categoryDescription: '',
        parentId: undefined,
    });
    const [notification, setNotification] = useState<string | null>(null); // For notification

    useEffect(() => {
        dispatch(fetchArticleCategories({ fetchAll: true }));
    }, [dispatch]);

    const handleCategoryClick = useCallback((category: typeof categories[0]) => {
        setSelectedCategory(category);
        setFormData({
            categoryName: category.categoryName,
            categoryDescription: category.categoryDescription || '',
            parentId: category.parentId,
        });
    }, []);

    const closeForm = useCallback(() => {
        setSelectedCategory(null);
        setFormData({
            categoryName: '',
            categoryDescription: '',
            parentId: undefined,
        });
    }, []);

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
        },
        []
    );

    const handleUpdate = async () => {
        if (!selectedCategory) return;

        try {
            const updatedArticleCategory: any = {
                id: selectedCategory.id,
                ...formData,
            };

            const parentIdInt = formData.parentId ? Number(formData.parentId) : undefined;

            if (parentIdInt && isNaN(parentIdInt)) {
                console.error('Parent ID must be a valid number');
                return;
            }

            if (parentIdInt && !isNaN(parentIdInt)) {
                updatedArticleCategory.parentId = parentIdInt;
            } else {
                delete updatedArticleCategory.parentId;
            }

            await dispatch(updateArticleCategory(updatedArticleCategory)).unwrap();
            setNotification('دسته‌بندی با موفقیت به ‌روزرسانی شد!');
            dispatch(fetchArticleCategories({ fetchAll: true }));

            closeForm();
            setTimeout(() => setNotification(null), 5000);
        } catch (err: any) {
            console.error('Failed to update category:', err);
            setNotification('خطایی در به‌ روزرسانی دسته‌بندی رخ داد.');
            setTimeout(() => setNotification(null), 5000);
        }
    };

    const filteredCategories = categories.filter((category) =>
        category.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.categoryDescription?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6 bg-gray-50 rtl relative">
            <h1 className="text-lg font-bold mb-4 text-white font-dana">دسته‌بندی‌ها</h1>

            <div className="mb-6">
                <input
                    type="text"
                    className="w-full p-4 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105 font-yekan"
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
                                <p className="text-gray-600 font-vazir"><strong>توضیحات:</strong> {category.categoryDescription || 'N/A'}</p>
                                {category.parentId ? (
                                    <p className="text-gray-600 font-vazir">
                                        <strong>دسته‌بندی والد:</strong> {category.parentId ? category.categoryName : 'N/A'}
                                    </p>
                                ) : (
                                    <p className="text-gray-600 font-vazir">
                                        <strong>دسته‌بندی والد:</strong> {category.parentId ? 'No Parent Data' : 'N/A'}
                                    </p>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-600 font-vazir">هیچ دسته‌بندی‌ای با این شرایط یافت نشد.</p>
                    )}
                </div>
            )}

            {selectedCategory && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/3 transform transition-all duration-500">
                        <h2 className="text-2xl font-semibold text-indigo-600 mb-4 font-tanha">ویرایش {selectedCategory.categoryName}</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-600 font-vazir">نام</label>
                                <input
                                    name="categoryName"
                                    value={formData.categoryName || ''}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 shadow-md transition-all duration-200 font-yekan"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 font-vazir">توضیحات</label>
                                <textarea
                                    name="categoryDescription"
                                    value={formData.categoryDescription || ''}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 shadow-md transition-all duration-200 font-yekan"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 font-vazir">دسته‌بندی والد</label>
                                <select
                                    name="parentId"
                                    value={formData.parentId || ''}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 shadow-md transition-all duration-200 font-yekan"
                                >
                                    <option value="">بدون والد</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.categoryName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end mt-6 gap-4 sm:gap-2 md:gap-8">
                            <button
                                onClick={closeForm}
                                className="px-8 py-3 bg-gray-300 text-gray-700 font-semibold rounded-xl shadow-lg transform transition duration-300 ease-in-out hover:bg-gray-400 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 font-yekan"
                            >
                                لغو
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg transform transition duration-300 ease-in-out hover:bg-indigo-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-yekan"
                            >
                                ذخیره
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Notification */}
            {notification && (
                <div
                    className={`fixed top-4 left-1/2 transform -translate-x-1/2 
                    ${notification.includes("به‌روزرسانی") ? "bg-blue-400" : "bg-red-500"} 
                    text-white px-10 py-5 rounded-lg shadow-lg z-50 opacity-0 transition-opacity duration-1000 ease-out
                    ${notification ? "opacity-100" : "opacity-0"} font-yekan`}
                >
                    {notification}
                </div>
            )}
        </div>
    );
};

export default EditArticleCategory;

