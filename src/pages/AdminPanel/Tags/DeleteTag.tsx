import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTags, deleteTag } from '../../../features/tags/tagThunks';
import { RootState, AppDispatch } from '../../../store';

const DeleteTag = () => {
    const dispatch = useDispatch<AppDispatch>();

    const tags = useSelector((state: RootState) => state.tags.tags);
    const tagsLoading = useSelector((state: RootState) => state.tags.status === 'loading');
    const error = useSelector((state: RootState) => state.tags.error);

    const [searchQuery, setSearchQuery] = useState('');
    const [tagToDelete, setTagToDelete] = useState<typeof tags[0] | null>(null);
    const [notification, setNotification] = useState<string | null>(null);

    useEffect(() => {
        dispatch(fetchTags({ fetchAll: true }));
    }, [dispatch]);

    const handleDeleteConfirm = async () => {
        if (!tagToDelete) return;

        try {
            await dispatch(deleteTag(tagToDelete.id)).unwrap();
            setNotification('برچسب با موفقیت حذف شد!');
            setTimeout(() => setNotification(null), 5000);
            setTagToDelete(null);
        } catch (err) {
            console.error('Failed to delete tag:', err);
            setNotification('خطایی در حذف برچسب رخ داد.');
            setTimeout(() => setNotification(null), 5000);
        }
    };

    const filteredTags = tags.filter((tag) =>
        tag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tag.slug.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6 bg-gray-50 rtl relative">
            <h1 className="text-lg font-bold mb-4 text-white font-dana">برچسب‌ها</h1>

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

            {tagsLoading && <p className="text-center text-blue-500">در حال بارگذاری...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            {!tagsLoading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredTags.length > 0 ? (
                        filteredTags.map((tag) => (
                            <div
                                key={tag.id}
                                className="p-4 bg-white border rounded-lg shadow-lg cursor-pointer hover:bg-indigo-50 hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative"
                            >
                                <h2 className="text-xl font-semibold text-indigo-600 mb-2">{tag.name}</h2>
                                <p className="text-gray-600 font-vazir"><strong>نام:</strong> {tag.name}</p>
                                <p className="text-gray-600 font-vazir"><strong>اسلاگ:</strong> {tag.slug}</p>
                                <p className="text-gray-600 font-vazir"><strong>متا عنوان:</strong> {tag.metaTitle || 'N/A'}</p>
                                <p className="text-gray-600 font-vazir"><strong>متا توضیحات:</strong> {tag.metaDescription || 'N/A'}</p>
                                {tag.parentId ? (
                                    <p className="text-gray-600 font-vazir">
                                        <strong>برچسب والد:</strong> {tag.parentId ? tag.name : 'N/A'}
                                    </p>
                                ) : (
                                    <p className="text-gray-600 font-vazir">
                                        <strong>برچسب والد:</strong> {tag.parentId ? 'No Parent Data' : 'N/A'}
                                    </p>
                                )}
                                <div className="mt-4 flex justify-end">
                                    <button
                                        onClick={() => setTagToDelete(tag)}
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
                                    >
                                        حذف
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-600">هیچ برچسبی با این شرایط یافت نشد.</p>
                    )}
                </div>
            )}

            {/* Delete Confirmation Form */}
            {tagToDelete && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/3">
                        <h2 className="text-xl font-semibold font-shabnam text-gray-800 mb-6">از حذف مطمئن هستید؟</h2>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setTagToDelete(null)}
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

export default DeleteTag;
