import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories, deleteCategory } from '../../../features/categories/categoryThunks';  // Assuming `deleteCategory` is in `categoryThunks`
import { RootState, AppDispatch } from '../../../store';

const DeleteCategory = () => {
    const dispatch = useDispatch<AppDispatch>();

    const categories = useSelector((state: RootState) => state.categories.categories);
    const categoriesLoading = useSelector((state: RootState) => state.categories.status === 'loading');
    const error = useSelector((state: RootState) => state.categories.error);

    const [searchQuery, setSearchQuery] = useState('');
    const [categoryToDelete, setCategoryToDelete] = useState<typeof categories[0] | null>(null);
    const [notification, setNotification] = useState<string | null>(null);

    useEffect(() => {
        dispatch(fetchCategories({ fetchAll: true }));
    }, [dispatch]);

    const handleDeleteConfirm = async () => {
        if (!categoryToDelete) return;

        try {
            await dispatch(deleteCategory(categoryToDelete.id)).unwrap();
            setNotification('دسته‌بندی با موفقیت حذف شد!');
            setTimeout(() => setNotification(null), 5000);
            setCategoryToDelete(null);
            dispatch(fetchCategories({ fetchAll: true }));

        } catch (err) {
            console.error('Failed to delete category:', err);
            setNotification('خطایی در حذف دسته‌بندی رخ داد.');
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

            {/* Search Box */}
            <div className="mb-6">
                <input
                    type="text"
                    className="w-full p-4 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105 font-yekan"
                    placeholder="جستجو کنید..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {categoriesLoading && <p className="text-center text-blue-500">در حال بارگذاری...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            {!categoriesLoading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredCategories.length > 0 ? (
                        filteredCategories.map((category) => (
                            <div
                                key={category.id}
                                className="p-4 bg-white border rounded-lg shadow-lg cursor-pointer hover:bg-indigo-50 hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative"
                            >
                                <h2 className="text-xl font-semibold text-indigo-600 mb-2">{category.categoryName}</h2>
                                <p className="text-gray-600 font-vazir"><strong>نام:</strong> {category.categoryName}</p>
                                <p className="text-gray-600 font-vazir"><strong>توضیحات:</strong> {category.categoryDescription || 'N/A'}</p>
                                <p className="text-gray-600 font-vazir"><strong>توضیحات:</strong> {category.categoryDescription || 'N/A'}</p>
                                {category.children && category.children.length > 0 ? (
                                    <p className="text-gray-600 font-vazir">
                                        <strong>برچسب والد:</strong> {category.children[0].categoryName || 'N/A'}
                                    </p>
                                ) : (
                                    <p className="text-gray-600 font-vazir">
                                        <strong>برچسب والد:</strong> {category.id ? 'No Parent Data' : 'N/A'}
                                    </p>
                                )}


                                <div className="mt-4 flex justify-end">
                                    <button
                                        onClick={() => setCategoryToDelete(category)}
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
                                    >
                                        حذف
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-600">هیچ دسته‌بندی‌ای با این شرایط یافت نشد.</p>
                    )}
                </div>
            )}

            {/* Delete Confirmation Form */}
            {categoryToDelete && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/3">
                        <h2 className="text-xl font-semibold font-shabnam text-gray-800 mb-6">از حذف مطمئن هستید؟</h2>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setCategoryToDelete(null)}
                                className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow hover:bg-gray-400"
                            >
                                لغو
                            </button>
                            <button
                                onClick={handleDeleteConfirm}
                                className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600"
                            >
                                تایید حذف
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

export default DeleteCategory;
