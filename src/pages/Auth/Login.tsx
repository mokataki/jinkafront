import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/auth/authThunks';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { AppDispatch } from '../../store';
import { RootState } from '../../store'; // import RootState to type the selector
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

// Validation schema using Yup
const validationSchema = Yup.object({
    email: Yup.string()
        .email('ایمیل معتبر نیست.')
        .required('ایمیل الزامی است.'),
    password: Yup.string()
        .min(8, 'کلمه عبور باید حداقل ۸ کاراکتر باشد.')
        .required('کلمه عبور الزامی است.')
});

const Login: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    // Access the error from the Redux state (authState.error)
    const authError = useSelector((state: RootState) => state.auth.error);

    // Handle form submission
    const handleLogin = async (values: { email: string; password: string }) => {
        setLoading(true);
        try {
            const result: any = await dispatch(
                login({ email: values.email, password: values.password })
            ).unwrap();

            // If login is successful, navigate based on the user's role
            if (result.user.role === 'ADMIN') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (err: any) {
            console.error('Login failed:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">ورود</h1>

                {/* General Error Message */}
                {authError && (
                    <div className="p-4 mb-4 text-sm text-red-800 bg-red-50 border-l-4 border-red-500 rounded-lg">
                        <strong className="font-medium">خطا:</strong>
                        <p>{authError}</p>
                    </div>
                )}

                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleLogin}
                >
                    {({ values, handleChange, handleBlur, errors, touched }) => (
                        <Form>
                            <div className="space-y-6">
                                {/* Email Input */}
                                <div className="relative">
                                    <Field
                                        type="email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="ایمیل"
                                        aria-label="ایمیل"
                                        className={`w-full p-4 pl-12 border-2 ${
                                            touched.email && errors.email
                                                ? 'border-red-500'
                                                : 'border-gray-300'
                                        } rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                                            touched.email && errors.email
                                                ? 'focus:ring-red-500'
                                                : 'focus:ring-indigo-500'
                                        } transition-all duration-300`}
                                    />
                                    <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    {touched.email && errors.email && (
                                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                    )}
                                </div>

                                {/* Password Input */}
                                <div className="relative">
                                    <Field
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="کلمه عبور"
                                        aria-label="کلمه عبور"
                                        className={`w-full p-4 pl-12 border-2 ${
                                            touched.password && errors.password
                                                ? 'border-red-500'
                                                : 'border-gray-300'
                                        } rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                                            touched.password && errors.password
                                                ? 'focus:ring-red-500'
                                                : 'focus:ring-indigo-500'
                                        } transition-all duration-300`}
                                    />
                                    <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute left-10 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                    {touched.password && errors.password && (
                                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                                    )}
                                </div>

                                {/* Login Button */}
                                <button
                                    type="submit"
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
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Login;
