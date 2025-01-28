import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store";
import { fetchColors } from "../../../features/colours/colourThunks.ts";

const ListColors = () => {
    const dispatch = useDispatch<AppDispatch>();

    // Selectors for colors, loading, and error
    const { colors, status, error } = useSelector((state: RootState) => state.colors);

    const [selectedColor, setSelectedColor] = useState<typeof colors[0] | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");

    // Fetch colors when component mounts or if status is "idle"
    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchColors({ fetchAll: true }));
        }
    }, [dispatch, status]);

    // Refetch colors when a color is added or deleted

    const handleColorClick = (color: typeof colors[0]) => {
        setSelectedColor(color);
    };

    const closeForm = () => {
        setSelectedColor(null);
    };

    // Filter colors based on search query
    const filteredColors = colors.filter(
        (color) =>
            typeof color.color === "string" &&
            color.color.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6 bg-gray-50 rtl">
            <h1 className="text-lg font-bold mb-4 text-white font-dana">رنگ‌ها</h1>

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

            {status === "loading" && (
                <p className="text-center text-blue-500 font-shabnam">در حال بارگذاری...</p>
            )}
            {status === "failed" && error && (
                <p className="text-center text-red-500 font-parasto">{error}</p>
            )}
            {status === "succeeded" && (
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredColors.length > 0 ? (
                        filteredColors.map((color) => (
                            <div
                                key={color.id}
                                className="p-4 bg-white border rounded-lg shadow-lg cursor-pointer hover:bg-indigo-50 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                onClick={() => handleColorClick(color)}
                            >
                                <h2 className="text-xl font-semibold text-indigo-600 mb-2 font-tanha">
                                    {color.color}
                                </h2>
                                <p className="text-gray-600 font-vazir">
                                    <strong>نام:</strong> {color.color}
                                </p>
                                <p className="text-gray-600 font-vazir">
                                    <strong>اسلاگ:</strong> {color.slug}
                                </p>
                                <p className="text-gray-600 font-vazir">
                                    <strong>ایجاد:</strong>{" "}
                                    {new Date(color.createdAt).toLocaleDateString("fa-IR")}
                                </p>
                                <p className="text-gray-600 font-vazir">
                                    <strong>به‌روزرسانی:</strong>{" "}
                                    {new Date(color.updatedAt).toLocaleDateString("fa-IR")}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-600 font-vazir">
                            هیچ رنگی با این شرایط یافت نشد.
                        </p>
                    )}
                </div>
            )}

            {selectedColor && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/3">
                        <h2 className="text-2xl font-semibold text-indigo-600 mb-4 font-tanha">
                            {selectedColor.color}
                        </h2>
                        <div className="space-y-2 mb-4">
                            <p className="font-vazir">
                                <strong>Slug:</strong> {selectedColor.slug}
                            </p>
                            <p className="font-vazir">
                                <strong>ایجاد:</strong>{" "}
                                {new Date(selectedColor.createdAt).toLocaleDateString("fa-IR")}
                            </p>
                            <p className="font-vazir">
                                <strong>به‌روزرسانی:</strong>{" "}
                                {new Date(selectedColor.updatedAt).toLocaleDateString("fa-IR")}
                            </p>
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

export default ListColors;
