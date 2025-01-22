import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTags, updateTag } from '../../../features/tags/tagThunks';
import { RootState, AppDispatch } from '../../../store';

const EditTag = () => {
    const dispatch = useDispatch<AppDispatch>();

    const tags = useSelector((state: RootState) => state.tags.tags);
    const tagsLoading = useSelector((state: RootState) => state.tags.status === 'loading');
    const error = useSelector((state: RootState) => state.tags.error);

    const [selectedTag, setSelectedTag] = useState<typeof tags[0] | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [formData, setFormData] = useState<Partial<typeof tags[0]>>({
        name: '',
        metaTitle: '',
        metaDescription: '',
        parentId: undefined,
    });
    const [notification, setNotification] = useState<string | null>(null); // For animation alarm

    useEffect(() => {
        dispatch(fetchTags({ fetchAll: true }));
    }, [dispatch]);

    const handleTagClick = useCallback((tag: typeof tags[0]) => {
        setSelectedTag(tag);
        setFormData({
            name: tag.name,
            metaTitle: tag.metaTitle || '',
            metaDescription: tag.metaDescription || '',
            parentId: tag.parentId,
        });
    }, []);

    const closeForm = useCallback(() => {
        setSelectedTag(null);
        setFormData({
            name: '',
            metaTitle: '',
            metaDescription: '',
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
        if (!selectedTag) return;

        try {
            const updatedTag: any = {
                id: selectedTag.id,
                ...formData,
            };

            const parentIdInt = formData.parentId ? Number(formData.parentId) : undefined;

            if (parentIdInt && isNaN(parentIdInt)) {
                console.error('Parent ID must be a valid number');
                return;
            }

            if (parentIdInt && !isNaN(parentIdInt)) {
                updatedTag.parentId = parentIdInt;
            } else {
                delete updatedTag.parentId;
            }

            await dispatch(updateTag(updatedTag)).unwrap();
            setNotification('برچسب با موفقیت به ‌روزرسانی شد!');
            closeForm();
            setTimeout(() => setNotification(null), 5000);
        } catch (err: any) {
            console.error('Failed to update tag:', err);
            setNotification('خطایی در به‌ روزرسانی برچسب رخ داد.');
            setTimeout(() => setNotification(null), 5000);
        }
    };

    const filteredTags = tags.filter((tag) =>
        tag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tag.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (tag.metaTitle && tag.metaTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (tag.metaDescription && tag.metaDescription.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="p-6 bg-gray-50 rtl relative">
            <h1 className="text-lg font-bold mb-4 text-white font-dana">برچسب‌ها</h1>

            <div className="mb-6">
                <input
                    type="text"
                    className="w-full p-4 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105 font-yekan"
                    placeholder="جستجو کنید..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {tagsLoading && <p className="text-center text-blue-500 font-shabnam">در حال بارگذاری...</p>}
            {error && <p className="text-center text-red-500 font-parasto">{error}</p>}

            {!tagsLoading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredTags.length > 0 ? (
                        filteredTags.map((tag) => (
                            <div
                                key={tag.id}
                                className="p-4 bg-white border rounded-lg shadow-lg cursor-pointer hover:bg-indigo-50 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                onClick={() => handleTagClick(tag)}
                            >
                                <h2 className="text-xl font-semibold text-indigo-600 mb-2 font-tanha">{tag.name}</h2>
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
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-600 font-vazir">هیچ برچسبی با این شرایط یافت نشد.</p>
                    )}
                </div>
            )}

            {selectedTag && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/3 transform transition-all duration-500">
                        <h2 className="text-2xl font-semibold text-indigo-600 mb-4 font-tanha">ویرایش {selectedTag.name}</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-600 font-vazir">نام</label>
                                <input
                                    name="name"
                                    value={formData.name || ''}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 shadow-md transition-all duration-200 font-yekan"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 font-vazir">متا عنوان</label>
                                <input
                                    name="metaTitle"
                                    value={formData.metaTitle || ''}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 shadow-md transition-all duration-200 font-yekan"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 font-vazir">متا توضیحات</label>
                                <textarea
                                    name="metaDescription"
                                    value={formData.metaDescription || ''}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 shadow-md transition-all duration-200 font-yekan"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 font-vazir">برچسب والد</label>
                                <select
                                    name="parentId"
                                    value={formData.parentId || ''}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 shadow-md transition-all duration-200 font-yekan"
                                >
                                    <option value="">بدون والد</option>
                                    {tags.map((tag) => (
                                        <option key={tag.id} value={tag.id}>
                                            {tag.name}
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

export default EditTag;
