import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../features/auth/authThunks';
import { selectAuth } from '../../features/auth/authSlice';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import {useNavigate} from "react-router-dom";

const Register: React.FC = () => {
    const dispatch = useDispatch();
    const { isLoading, error,user } = useSelector(selectAuth);
    const navigate = useNavigate(); // Hook to navigate after successful registration

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleRegister = async () => {
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            await dispatch(
                register({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                })
            );

            // After successful registration, redirect based on user role
            if (user?.role === 'admin') {
                navigate('/admin-panel'); // Redirect to admin panel if user is admin
            } else {
                navigate('/'); // Redirect to home page if user is not an admin
            }
        } catch (err) {
            // Handle error
            console.error('Registration failed:', err);
        }
    };
    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">ثبت نام</h1>
                {error && <div className="text-red-500 text-center mb-4">{error}</div>}
                <div className="space-y-6">
                    {/* Name Input */}
                    <div className="relative">
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="نام"
                            className="w-full p-4 pl-12 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500"
                        />
                        <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                    {/* Email Input */}
                    <div className="relative">
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="ایمیل"
                            className="w-full p-4 pl-12 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500"
                        />
                        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                    {/* Password Input */}
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="کلمه عبور"
                            className="w-full p-4 pl-12 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500"
                        />
                        <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-400"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    {/* Confirm Password Input */}
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={formData.confirmPassword}
                            onChange={(e) =>
                                setFormData({ ...formData, confirmPassword: e.target.value })
                            }
                            placeholder="تایید کلمه عبور"
                            className="w-full p-4 pl-12 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500"
                        />
                        <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-400"
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    {/* Register Button */}
                    <button
                        onClick={handleRegister}
                        disabled={isLoading}
                        className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-md"
                    >
                        {isLoading ? 'در حال ثبت نام...' : 'ثبت نام'}
                    </button>
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            حساب کاربری دارید؟{' '}
                            <a href="/login" className="text-indigo-600 hover:underline">
                                وارد شوید
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
