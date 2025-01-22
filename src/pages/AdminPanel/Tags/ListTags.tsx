import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTags } from '../../../features/tags/tagThunks';
import { RootState, AppDispatch } from '../../../store';

const ListTags = () => {
    const dispatch = useDispatch<AppDispatch>();

    // Selectors for tags, loading, and error
    const tags = useSelector((state: RootState) => state.tags.tags);
    const tagsLoading = useSelector((state: RootState) => state.tags.status === 'loading');
    const error = useSelector((state: RootState) => state.tags.error);

    const [selectedTag, setSelectedTag] = useState<typeof tags[0] | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query

    useEffect(() => {
        dispatch(fetchTags({ fetchAll: true }));
    }, [dispatch]);

    const handleTagClick = (tag: typeof tags[0]) => {
        setSelectedTag(tag);
    };

    const closeForm = () => {
        setSelectedTag(null);
    };

    // Filter tags based on search query
    const filteredTags = tags.filter((tag) =>
        tag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tag.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (tag.metaTitle && tag.metaTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (tag.metaDescription && tag.metaDescription.toLowerCase().includes(searchQuery.toLowerCase()))

    );

    return (
        <div className="p-6 bg-gray-50 rtl">
            <h1 className="text-lg font-bold mb-4 text-white font-dana">برچسب‌ها</h1>

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

                                {/* Parent Tag */}
                                {tag.parentId ? (
                                    <p className="text-gray-600 font-vazir">
                                        <strong>برچسب والد:</strong> {tag.parentId ? tag.name : 'N/A'}
                                    </p>
                                ) : (
                                    <p className="text-gray-600 font-vazir">
                                        <strong>برچسب والد:</strong> {tag.parentId ? 'No Parent Data' : 'N/A'}
                                    </p>
                                )}

                                {Array.isArray(tag.children) && tag.children.length > 0 && (
                                    <div>
                                        <p className="text-gray-600 font-vazir"><strong>فرزندان:</strong></p>
                                        <ul>
                                            {tag.children.map((child) => (
                                                <li key={child.id} className="text-gray-700 font-vazir">{child.name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <p className="text-gray-600 font-vazir"><strong>تاریخ ایجاد:</strong> {new Date(tag.createdAt).toLocaleDateString('fa-IR')}</p>
                                <p className="text-gray-600 font-vazir"><strong>تاریخ به‌روزرسانی:</strong> {new Date(tag.updatedAt).toLocaleDateString('fa-IR')}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-600 font-vazir">هیچ برچسبی با این شرایط یافت نشد.</p>
                    )}
                </div>
            )}

            {selectedTag && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/3">
                        <h2 className="text-2xl font-semibold text-indigo-600 mb-4 font-tanha">{selectedTag.name}</h2>
                        <div className="space-y-2 mb-4">
                            <p className="font-vazir"><strong>نام:</strong> {selectedTag.name}</p>
                            <p className="font-vazir"><strong>اسلاگ:</strong> {selectedTag.slug}</p>
                            <p className="font-vazir"><strong>متا عنوان:</strong> {selectedTag.metaTitle || 'N/A'}</p>
                            <p className="font-vazir"><strong>متا توضیحات:</strong> {selectedTag.metaDescription || 'N/A'}</p>

                            {/* Parent Tag for Selected Tag */}
                            {selectedTag.parentId ? (
                                <p className="font-vazir">
                                    <strong>برچسب والد:</strong> {selectedTag.parentId ? selectedTag.name : 'N/A'}
                                </p>
                            ) : (
                                <p className="font-vazir">
                                    <strong>برچسب والد:</strong> {selectedTag.parentId ? 'No Parent Data' : 'N/A'}
                                </p>
                            )}

                            {Array.isArray(selectedTag.children) && selectedTag.children.length > 0 && (
                                <div>
                                    <p className="font-vazir"><strong>فرزندان:</strong></p>
                                    <ul>
                                        {selectedTag.children.map((child) => (
                                            <li key={child.id} className="text-gray-700 font-vazir">{child.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <p className="font-vazir"><strong>تاریخ ایجاد:</strong> {new Date(selectedTag.createdAt).toLocaleDateString('fa-IR')}</p>
                            <p className="font-vazir"><strong>تاریخ به‌روزرسانی:</strong> {new Date(selectedTag.updatedAt).toLocaleDateString('fa-IR')}</p>
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

export default ListTags;

