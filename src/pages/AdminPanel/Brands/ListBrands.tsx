import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBrands } from '../../../features/brands/brandThunks';
import { RootState, AppDispatch } from '../../../store';

const ListBrands = () => {
    const dispatch = useDispatch<AppDispatch>();

    // Selectors for brands, loading, and error
    const brands = useSelector((state: RootState) => state.brands.brands);
    const brandsLoading = useSelector((state: RootState) => state.brands.status === 'loading');
    const error = useSelector((state: RootState) => state.brands.error);

    const [selectedBrand, setSelectedBrand] = useState<typeof brands[0] | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query

    useEffect(() => {
        dispatch(fetchBrands({ fetchAll: true }));
    }, [dispatch]);

    const handleBrandClick = (brand: typeof brands[0]) => {
        setSelectedBrand(brand);
    };

    const closeForm = () => {
        setSelectedBrand(null);
    };

    // Filter brands based on search query
    const filteredBrands = brands.filter((brand) => {
        // Safely handle undefined or null name or slug properties
        const brandName = (brand?.brandName || '').toLowerCase();  // Ensure 'name' is not undefined or null
        const brandSlug = (brand?.slug || '').toLowerCase();  // Ensure 'slug' is not undefined or null

        // Check if the name or slug matches the search query
        return brandName.includes(searchQuery.toLowerCase()) ||
            brandSlug.includes(searchQuery.toLowerCase());
    });


    return (
        <div className="p-6 bg-gray-50 rtl">
            <h1 className="text-lg font-bold mb-4 text-white font-dana">برندها</h1>

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

            {brandsLoading && <p className="text-center text-blue-500 font-shabnam">در حال بارگذاری...</p>}
            {error && <p className="text-center text-red-500 font-parasto">{error}</p>}
            {!brandsLoading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredBrands.length > 0 ? (
                        filteredBrands.map((brand) => (
                            <div
                                key={brand.id}
                                className="p-4 bg-white border rounded-lg shadow-lg cursor-pointer hover:bg-indigo-50 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                onClick={() => handleBrandClick(brand)}
                            >
                                <h2 className="text-xl font-semibold text-indigo-600 mb-2 font-tanha">{brand.brandName}</h2>
                                <p className="text-gray-600 font-vazir"><strong>نام:</strong> {brand.brandName}</p>
                                <p className="text-gray-600 font-vazir"><strong>اسلاگ:</strong> {brand.slug}</p>
                                <p className="text-gray-600 font-vazir"><strong>تاریخ ایجاد:</strong> {new Date(brand.createdAt).toLocaleDateString('fa-IR')}</p>
                                <p className="text-gray-600 font-vazir"><strong>تاریخ به‌روزرسانی:</strong> {new Date(brand.updatedAt).toLocaleDateString('fa-IR')}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-600 font-vazir">هیچ برندی با این شرایط یافت نشد.</p>
                    )}
                </div>
            )}

            {selectedBrand && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/3">
                        <h2 className="text-2xl font-semibold text-indigo-600 mb-4 font-tanha">{selectedBrand.brandName}</h2>
                        <div className="space-y-2 mb-4">
                            <p className="font-vazir"><strong>نام:</strong> {selectedBrand.brandName}</p>
                            <p className="font-vazir"><strong>اسلاگ:</strong> {selectedBrand.slug}</p>
                            <p className="font-vazir"><strong>تاریخ ایجاد:</strong> {new Date(selectedBrand.createdAt).toLocaleDateString('fa-IR')}</p>
                            <p className="font-vazir"><strong>تاریخ به‌روزرسانی:</strong> {new Date(selectedBrand.updatedAt).toLocaleDateString('fa-IR')}</p>
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

export default ListBrands;
