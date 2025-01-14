
const Home = () => {
    return (
        <div className="container rounded-lg mx-auto py-6 bg-gray-100 p-7" >
            {/* Hero Section */}
            <div className="text-center py-12 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg shadow-lg">
                <h1 className="text-4xl font-extrabold">خوش آمدید به فروشگاه آنلاین ما</h1>
                <p className="mt-4 text-lg">تمام محصولات با کیفیت و ارسال سریع به شما عرضه می‌شوند.</p>
                <button className="mt-6 bg-yellow-500 text-black py-2 px-6 rounded-lg text-lg hover:bg-yellow-400">
                    شروع خرید
                </button>
            </div>

            {/* Featured Categories Section */}
            <div className="mt-12">
                <h2 className="text-2xl font-semibold text-center">دسته بندی های محصولات</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
                    <div className="bg-white p-4 rounded-lg shadow-md text-center hover:bg-yellow-100">
                        <img src="category-image-1.jpg" alt="Category 1" className="w-full h-40 object-cover rounded-md" />
                        <h3 className="mt-4 text-xl font-semibold">لباس و پوشاک</h3>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md text-center hover:bg-yellow-100">
                        <img src="category-image-2.jpg" alt="Category 2" className="w-full h-40 object-cover rounded-md" />
                        <h3 className="mt-4 text-xl font-semibold">الکترونیک</h3>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md text-center hover:bg-yellow-100">
                        <img src="category-image-3.jpg" alt="Category 3" className="w-full h-40 object-cover rounded-md" />
                        <h3 className="mt-4 text-xl font-semibold">لوازم خانگی</h3>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md text-center hover:bg-yellow-100">
                        <img src="category-image-4.jpg" alt="Category 4" className="w-full h-40 object-cover rounded-md" />
                        <h3 className="mt-4 text-xl font-semibold">زیبایی و مراقبت</h3>
                    </div>
                </div>
            </div>

            {/* Product Showcase Section */}
            <div className="mt-12">
                <h2 className="text-2xl font-semibold text-center">محصولات ویژه</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <img src="product-image-1.jpg" alt="Product 1" className="w-full h-56 object-cover rounded-md" />
                        <h3 className="mt-4 text-lg font-semibold">محصول 1</h3>
                        <p className="mt-2 text-gray-700">توضیح کوتاهی درباره محصول</p>
                        <p className="mt-4 text-xl font-bold">۲۵۰,۰۰۰ تومان</p>
                        <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500">خرید</button>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <img src="product-image-2.jpg" alt="Product 2" className="w-full h-56 object-cover rounded-md" />
                        <h3 className="mt-4 text-lg font-semibold">محصول 2</h3>
                        <p className="mt-2 text-gray-700">توضیح کوتاهی درباره محصول</p>
                        <p className="mt-4 text-xl font-bold">۳۰۰,۰۰۰ تومان</p>
                        <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500">خرید</button>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <img src="product-image-3.jpg" alt="Product 3" className="w-full h-56 object-cover rounded-md" />
                        <h3 className="mt-4 text-lg font-semibold">محصول 3</h3>
                        <p className="mt-2 text-gray-700">توضیح کوتاهی درباره محصول</p>
                        <p className="mt-4 text-xl font-bold">۱۵۰,۰۰۰ تومان</p>
                        <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500">خرید</button>
                    </div>
                </div>
            </div>

            {/* Articles Section */}
            <div className="mt-12">
                <h2 className="text-2xl font-semibold text-center">مقالات و اخبار</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <img src="article-image-1.jpg" alt="Article 1" className="w-full h-56 object-cover rounded-md" />
                        <h3 className="mt-4 text-lg font-semibold">مقاله 1</h3>
                        <p className="mt-2 text-gray-700">خلاصه‌ای از مقاله 1 که مفاهیم جالبی را بیان می‌کند.</p>
                        <button className="mt-4 bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700">مطالعه بیشتر</button>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <img src="article-image-2.jpg" alt="Article 2" className="w-full h-56 object-cover rounded-md" />
                        <h3 className="mt-4 text-lg font-semibold">مقاله 2</h3>
                        <p className="mt-2 text-gray-700">خلاصه‌ای از مقاله 2 با نکات مفید برای مشتریان فروشگاه.</p>
                        <button className="mt-4 bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700">مطالعه بیشتر</button>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <img src="article-image-3.jpg" alt="Article 3" className="w-full h-56 object-cover rounded-md" />
                        <h3 className="mt-4 text-lg font-semibold">مقاله 3</h3>
                        <p className="mt-2 text-gray-700">مقاله‌ای درباره چگونگی استفاده از محصولات به بهترین نحو.</p>
                        <button className="mt-4 bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700">مطالعه بیشتر</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Home;
