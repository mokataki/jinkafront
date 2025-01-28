import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AppDispatch } from "../../../store";
import { createBrand, fetchBrands } from "../../../features/brands/brandThunks";
import { RootState } from "../../../store";

// Validation schema using Yup
const validationSchema = Yup.object({
    brandName: Yup.string().required('نام برند ضروری است'),
});

const CreateBrand: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const brandsLoading = useSelector((state: RootState) => state.brands.status === 'loading');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessageLocal, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const initialValues = {
        brandName: '',
    };

    useEffect(() => {
        dispatch(fetchBrands({ fetchAll: true }));
    }, [dispatch]);

    const handleSubmit = async (values: typeof initialValues) => {
        setIsSubmitting(true);
        setErrorMessage(null);
        setSuccessMessage(null);

        try {
            await dispatch(createBrand(values)).unwrap();
            setSuccessMessage('برند با موفقیت ایجاد شد');
            dispatch(fetchBrands({fetchAll:true})); // Fetch the brands, assume `fetchBrands` exists

        } catch (error: any) {
            console.error('Error creating brand:', error);
            if (error.message && error.statusCode === 409) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage('خطا در ایجاد برند. لطفاً دوباره تلاش کنید');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative mb-12 max-w-4xl mx-auto p-8 bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-400 rounded-2xl shadow-lg overflow-hidden backdrop-blur-lg">
            <div className="absolute inset-0 bg-black opacity-40 z-[-1]"></div>
            <h1 className="text-4xl mb-8 text-center text-white font-Tanha">ایجاد برند جدید</h1>

            {/* Display error message */}
            {errorMessageLocal && (
                <div className="flex justify-center items-center bg-red-600 text-white text-lg font-vazir rounded-lg p-4 mb-6 shadow-lg transition-all duration-300 ease-in-out transform opacity-100">
                    <div className="flex items-center">
                        {errorMessageLocal} !
                    </div>
                </div>
            )}

            {/* Display success message */}
            {successMessage && (
                <div className="flex justify-center items-center bg-green-600 text-white text-lg font-vazir rounded-lg p-4 mb-6 shadow-lg transition-all duration-300 ease-in-out transform opacity-100">
                    <div className="flex items-center">
                        {successMessage} .
                    </div>
                </div>
            )}

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {() => (
                    <Form className="space-y-8">
                        {/* Brand Name */}
                        <div>
                            <label htmlFor="brandName" className="block text-lg text-white font-Tanha">نام برند</label>
                            <Field
                                type="text"
                                name="brandName"
                                id="brandName"
                                className="mt-3 p-4 w-full border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg shadow-md font-vazir"
                                dir="rtl"
                            />
                            <ErrorMessage name="brandName" component="div" className="font-vazir text-red-400 text-sm mt-1" />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={brandsLoading || isSubmitting}
                            className={`mt-6 w-full p-4 text-white text-xl font-Tanha ${brandsLoading || isSubmitting ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'} rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg`}
                        >
                            {brandsLoading || isSubmitting ? 'در حال ایجاد...' : 'ایجاد برند'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CreateBrand;
