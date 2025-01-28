import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchColors, updateColor } from "../../../features/colours/colourThunks";
import { RootState, AppDispatch } from "../../../store";

const EditColor = () => {
    const dispatch = useDispatch<AppDispatch>();

    const colors = useSelector((state: RootState) => state.colors.colors);
    const colorsLoading = useSelector((state: RootState) => state.colors.status === "loading");
    const error = useSelector((state: RootState) => state.colors.error);

    const [selectedColor, setSelectedColor] = useState<typeof colors[0] | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [formData, setFormData] = useState<Partial<typeof colors[0]>>({
        color: "",
    });
    const [notification, setNotification] = useState<string | null>(null);

    useEffect(() => {
        dispatch(fetchColors({fetchAll:true}));
    }, [dispatch]);

    const handleColorClick = useCallback((color: typeof colors[0]) => {
        setSelectedColor(color);
        setFormData({
            color: color.color,
        });
    }, []);

    const closeForm = useCallback(() => {
        setSelectedColor(null);
        setFormData({
            color: "",
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
        if (!selectedColor) return;

        try {
            const updatedColor = {
                id: selectedColor.id,
                color: formData.color || "",
            };

            // Dispatch updateColor and refresh the list of colors
            await dispatch(updateColor(updatedColor)).unwrap();

            // Fetch updated list of colors
            dispatch(fetchColors({fetchAll:true}));

            setNotification("رنگ با موفقیت به‌روزرسانی شد!");
            closeForm();
            setTimeout(() => setNotification(null), 5000);
        } catch (err: any) {
            console.error("Failed to update color:", err);
            setNotification("خطایی در به‌روزرسانی رنگ رخ داد.");
            setTimeout(() => setNotification(null), 5000);
        }
    };

    const filteredColors = colors.filter(
        (color) =>
            typeof color.color === "string" &&
            color.color.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6 bg-gray-50 rtl relative">
            <h1 className="text-lg font-bold mb-4 text-white font-dana">رنگ‌ها</h1>

            <div className="mb-6">
                <input
                    type="text"
                    className="w-full p-4 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105 font-yekan"
                    placeholder="جستجو کنید..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {colorsLoading && <p className="text-center text-blue-500 font-shabnam">در حال بارگذاری...</p>}
            {error && <p className="text-center text-red-500 font-parasto">{error}</p>}

            {!colorsLoading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredColors.map((color) => (
                        <div
                            key={color.id}
                            className="p-4 bg-white border rounded-lg shadow-lg cursor-pointer hover:bg-indigo-50 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            onClick={() => handleColorClick(color)}
                        >
                            <h2 className="text-xl font-semibold text-indigo-600 mb-2 font-tanha">{color.color}</h2>
                        </div>
                    ))}
                </div>
            )}

            {selectedColor && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/3 transform transition-all duration-500">
                        <h2 className="text-2xl font-semibold text-indigo-600 mb-4 font-tanha">
                            ویرایش {selectedColor.color}
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-600 font-vazir">نام رنگ</label>
                                <input
                                    name="color"
                                    value={formData.color || ""}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 shadow-md transition-all duration-200 font-yekan"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end mt-6 gap-4">
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

export default EditColor;
