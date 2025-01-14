import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/auth/authThunks';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { AppDispatch } from '../../store';
import { selectAuth } from '../../features/auth/authSlice';

const Login: React.FC = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const authState = useSelector(selectAuth);
    const [error, setError] = useState(''); // Ensure this state is defined

    const handleLogin = async () => {
        setLoading(true);
        setError('');
        try {
            const result: any = await dispatch(
                login({ email: formData.email, password: formData.password })
            ).unwrap();
            console.log(result.user.role)
            // Redirect based on user role
            if (result.user.role === 'ADMIN') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (err: any) {
            console.error('Login failed:', err);
            setError(err || 'Authentication failed.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">ورود</h1>
                {authState.error && (
                    <div className="text-red-500 text-center mb-4">{authState.error}</div>
                )}
                <div className="space-y-6">
                    {/* Email Input */}
                    <div className="relative">
                        {error && <p className="text-red-500">{error}</p>}
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="ایمیل"
                            aria-label="ایمیل"
                            className="w-full p-4 pl-12 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                        />
                        <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="کلمه عبور"
                            aria-label="کلمه عبور"
                            className="w-full p-4 pl-12 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                        />
                        <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute left-10 top-1/2 transform -translate-y-1/2 text-gray-400"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    {/* Login Button */}
                    <button
                        onClick={handleLogin}
                        className={`w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-md focus:outline-none transition-all duration-300 ${
                            loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        disabled={loading}
                    >
                        {loading ? 'در حال ورود...' : 'ورود'}
                    </button>

                    {/* Register Link */}
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            حساب کاربری ندارید؟{' '}
                            <a href="/register" className="text-indigo-600 hover:underline">
                                ثبت نام کنید
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
