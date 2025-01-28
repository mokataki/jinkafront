import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AppDispatch } from "../../../store";
import { createCategory, fetchCategories } from "../../../features/categories/categoryThunks";
import { RootState } from "../../../store";
import Select from 'react-select';

// Validation schema using Yup
const validationSchema = Yup.object({
    categoryName: Yup.string().required('نام دسته‌بندی ضروری است'),
    categoryDescription: Yup.string(),
    parentId: Yup.number().nullable(),
});

const CreateCategory: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const categories = useSelector((state: RootState) => state.categories.categories);
    const categoriesLoading = useSelector((state: RootState) => state.categories.status === 'loading');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessageLocal, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const initialValues = {
        categoryName: '',
        categoryDescription: '',
        parentId: undefined,
    };

    useEffect(() => {
        dispatch(fetchCategories({ fetchAll: true }));
    }, [dispatch]);

    const handleSubmit = async (values: typeof initialValues) => {
        setIsSubmitting(true);
        setErrorMessage(null);
        setSuccessMessage(null);

        const parentIdInt = values.parentId ? Number(values.parentId) : undefined;

        if (parentIdInt && isNaN(parentIdInt)) {
            console.error('Parent ID must be a valid number');
            setErrorMessage('parentId باید یک عدد صحیح باشد');
            setIsSubmitting(false);
            return;
        }

        try {
            // Dispatch create category action
            await dispatch(createCategory({ ...values, parentId: parentIdInt })).unwrap();
            setSuccessMessage('دسته‌بندی با موفقیت ایجاد شد');

            // Clear error message if creation is successful
            setErrorMessage(null);

            // Re-fetch categories to ensure the latest one is shown
            dispatch(fetchCategories({ page: 1, limit: 10 }));
        } catch (error: any) {
            console.error('Error creating category:', error);

            // Check if the error has the expected properties
            if (error?.message && error?.statusCode === 400) {
                setErrorMessage(error.message); // Display the message in the error response
            } else {
                // Default error message for other cases
                setErrorMessage('خطا در ایجاد دسته‌بندی. لطفاً دوباره تلاش کنید');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    // Sort categories by 'createdAt' in descending order to display latest categories first
    const sortedCategories = [...categories].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime(); // descending order
    });

    const formattedCategories = sortedCategories.map((category) => ({
        value: category.id,
        label: category.categoryName,
    }));

    return (
        <div className="relative mb-12 max-w-4xl mx-auto p-8 bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-400 rounded-2xl shadow-lg overflow-hidden backdrop-blur-lg">
            <div className="absolute inset-0 bg-black opacity-40 z-[-1]"></div>
            <h1 className="text-4xl mb-8 text-center text-white font-Tanha">ایجاد دسته‌بندی جدید</h1>

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
                {({ setFieldValue }) => (
                    <Form className="space-y-8">
                        {/* Category Name */}
                        <div>
                            <label htmlFor="categoryName" className="block text-lg text-white font-Tanha">نام دسته‌بندی</label>
                            <Field
                                type="text"
                                name="categoryName"
                                id="categoryName"
                                className="mt-3 p-4 w-full border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg shadow-md font-vazir"
                                dir="rtl"
                            />
                            <ErrorMessage name="categoryName" component="div" className="font-vazir text-red-400 text-sm mt-1" />
                        </div>

                        {/* Meta Description */}
                        <div>
                            <label htmlFor="categoryDescription" className="block text-lg text-white font-Tanha">توضیحات دسته بندی</label>
                            <Field
                                type="text"
                                name="categoryDescription"
                                id="categoryDescription"
                                className="mt-3 p-4 w-full border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg shadow-md font-vazir"
                            />
                            <ErrorMessage name="categoryDescription" component="div" className="font-vazir text-red-400 text-sm mt-1" />
                        </div>

                        {/* Parent Category (Optional) */}
                        <div>
                            <label htmlFor="parentId" className="block text-lg text-white font-Tanha">دسته‌بندی والد (اختیاری)</label>
                            <Select
                                name="parentId"
                                id="parentId"
                                options={formattedCategories}
                                className="mt-3 w-full text-lg font-shabnam border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-lg hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-300 ease-in-out"
                                classNamePrefix="custom-select"
                                placeholder="انتخاب دسته‌بندی والد"
                                onChange={(option) => setFieldValue("parentId", option ? option.value : undefined)}
                                isLoading={categoriesLoading}
                                isClearable
                                menuPortalTarget={document.body}
                                menuPosition="fixed"
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        backgroundColor: '#ffffff',
                                        borderRadius: '10px',
                                        padding: '0.5rem',
                                        borderColor: '#4c51bf',
                                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                                    }),
                                    menu: (provided) => ({
                                        ...provided,
                                        backgroundColor: '#ffffff',
                                        color: '#4c51bf',
                                        borderRadius: '8px',
                                    }),
                                    option: (provided, state) => ({
                                        ...provided,
                                        backgroundColor: state.isSelected
                                            ? '#5a67d8'
                                            : state.isFocused
                                                ? '#4c51bf'
                                                : '#ffffff',
                                        color: state.isSelected || state.isFocused ? '#fff' : '#4c51bf',
                                        padding: '10px',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: '#4c51bf',
                                            color: '#fff',
                                        },
                                    }),
                                    singleValue: (provided) => ({
                                        ...provided,
                                        color: '#4c51bf',
                                    }),
                                }}
                            />
                            <ErrorMessage name="parentId" component="div" className="text-red-400 text-sm mt-1" />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={categoriesLoading || isSubmitting}
                            className={`mt-6 w-full p-4 text-white text-xl font-Tanha ${categoriesLoading || isSubmitting ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'} rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg`}
                        >
                            {categoriesLoading || isSubmitting ? 'در حال ایجاد...' : 'ایجاد دسته‌بندی'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CreateCategory;
