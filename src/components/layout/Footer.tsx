// src/components/layout/Footer.tsx

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-6">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} برند من. تمام حقوق محفوظ است.</p>
                <ul className="flex justify-center space-x-6 mt-4">
                    <li><a href="https://facebook.com" className="hover:text-teal-400">فیسبوک</a></li>
                    <li><a href="https://twitter.com" className="hover:text-teal-400">توییتر</a></li>
                    <li><a href="https://instagram.com" className="hover:text-teal-400">اینستاگرام</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
