import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../features/auth/authThunks';
import { selectAuth } from '../../features/auth/authSlice';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Register: React.FC = () => {
    const dispatch = useDispatch();
    const { isLoading, error, user } = useSelector(selectAuth);
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Yup Validation Schema
    const validationSchema = Yup.object({
        name: Yup.string().required('نام الزامی است.'),
        email: Yup.string().email('ایمیل باید یک آدرس ایمیل معتبر باشد').required('ایمیل الزامی است.'),
        password: Yup.string()
            .min(8, 'کلمه عبور باید حداقل ۸ کاراکتر باشد.')
            .required('کلمه عبور الزامی است.'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'کلمه عبور و تایید کلمه عبور یکسان نیستند.')
            .required('تایید کلمه عبور الزامی است.'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const result = await dispatch(
                    register({
                        name: values.name,
                        email: values.email,
                        password: values.password,
                    })
                ).unwrap();

                // If registration is successful
                if (result && user) {
                    // Redirect to admin or home based on the user role
                    if (user?.role === 'admin') {
                        navigate('/admin-panel');
                    } else {
                        navigate('/');
                    }
                }
            } catch (err) {
                console.error('Registration failed:', err);
            }
        },
    });

    // Handle the API error response to translate it into Persian
    const translateError = (error: string) => {
        if (error === 'email must be an email') {
            return 'ایمیل باید یک آدرس ایمیل معتبر باشد';
        }
        return error; // Default case if no translation is found
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">ثبت نام</h1>

                {/* Error Message Handling */}
                {error && (
                    <div className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <svg
                            className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                        </svg>
                        <span className="sr-only">Danger</span>
                        <div>
                            <span className="font-medium">خطا:</span>
                            <ul className="mt-1.5 list-disc list-inside">
                                <li>{translateError(error)}</li>
                            </ul>
                        </div>
                    </div>
                )}

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    {/* Name Input */}
                    <div className="relative">
                        <input
                            type="text"
                            {...formik.getFieldProps('name')}
                            placeholder="نام"
                            className={`w-full p-4 pl-12 border-2 ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-indigo-500`}
                        />
                        <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        {formik.touched.name && formik.errors.name && <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>}
                    </div>

                    {/* Email Input */}
                    <div className="relative">
                        <input
                            type="email"
                            {...formik.getFieldProps('email')}
                            placeholder="ایمیل"
                            className={`w-full p-4 pl-12 border-2 ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-indigo-500`}
                        />
                        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        {formik.touched.email && formik.errors.email && <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>}
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            {...formik.getFieldProps('password')}
                            placeholder="کلمه عبور"
                            className={`w-full p-4 pl-12 border-2 ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-indigo-500`}
                        />
                        <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-400"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        {formik.touched.password && formik.errors.password && <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>}
                    </div>

                    {/* Confirm Password Input */}
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            {...formik.getFieldProps('confirmPassword')}
                            placeholder="تایید کلمه عبور"
                            className={`w-full p-4 pl-12 border-2 ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-indigo-500`}
                        />
                        <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-400"
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        {formik.touched.confirmPassword && formik.errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</p>}
                    </div>

                    {/* Register Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-md"
                    >
                        {isLoading ? 'در حال ثبت نام...' : 'ثبت نام'}
                    </button>

                    {/* Login Link */}
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            حساب کاربری دارید؟{' '}
                            <a href="/login" className="text-indigo-600 hover:underline">
                                وارد شوید
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
