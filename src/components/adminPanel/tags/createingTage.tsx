import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AppDispatch } from "../../../store";
import { createTag, fetchTags } from "../../../features/tags/tagThunks";
import { RootState } from "../../../store";
import Select from 'react-select';

// Validation schema using Yup
const validationSchema = Yup.object({
    name: Yup.string().required('نام برچسب ضروری است'),
    metaTitle: Yup.string(),
    metaDescription: Yup.string(),
    parentId: Yup.number().nullable(),
});

const CreatingTag: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const tags = useSelector((state: RootState) => state.tags.tags);
    const tagsLoading = useSelector((state: RootState) => state.tags.status === 'loading');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessageLocal, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const initialValues = {
        name: '',
        metaTitle: '',
        metaDescription: '',
        parentId: undefined,
    };

    useEffect(() => {
        dispatch(fetchTags({ fetchAll: true }));
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
            await dispatch(createTag({ ...values, parentId: parentIdInt })).unwrap();
            setSuccessMessage('برچسب با موفقیت ایجاد شد');
        } catch (error: any) {
            console.error('Error creating tag:', error);
            if (error.message && error.statusCode === 409) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage('خطا در ایجاد برچسب. لطفاً دوباره تلاش کنید');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const formattedTags = tags.map((tag) => ({
        value: tag.id,
        label: tag.name
    }));

    return (
        <div className="relative mb-12 max-w-4xl mx-auto p-8 bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-400 rounded-2xl shadow-lg overflow-hidden backdrop-blur-lg">
            <div className="absolute inset-0 bg-black opacity-40 z-[-1]"></div>
            <h1 className="text-4xl mb-8 text-center text-white font-Tanha">ایجاد برچسب جدید</h1>

            {/* Display error message */}
            {errorMessageLocal && (
                <div className="flex justify-center items-center bg-red-600 text-white text-lg font-vazir rounded-lg p-4 mb-6 shadow-lg transition-all duration-300 ease-in-out transform opacity-100">
                    <div className="flex items-center  ">
                        {errorMessageLocal} !
                    </div>
                </div>
            )}

            {/* Display success message */}
            {successMessage && (
                <div className="flex justify-center items-center bg-green-600 text-white text-lg font-vazir rounded-lg p-4 mb-6 shadow-lg transition-all duration-300 ease-in-out transform opacity-100">
                    <div className="flex items-center ">
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
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-lg  text-white font-Tanha">نام برچسب</label>
                            <Field
                                type="text"
                                name="name"
                                id="name"
                                className="mt-3 p-4 w-full border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg shadow-md font-vazir"
                                dir="rtl"
                            />
                            <ErrorMessage name="name" component="div" className="font-vazir text-red-400 text-sm mt-1" />
                        </div>

                        {/* Meta Title */}
                        <div>
                            <label htmlFor="metaTitle" className="block text-lg  text-white font-Tanha">عنوان متا</label>
                            <Field
                                type="text"
                                name="metaTitle"
                                id="metaTitle"
                                className="mt-3 p-4 w-full border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg shadow-md font-vazir"
                            />
                            <ErrorMessage name="metaTitle" component="div" className="font-vazir text-red-400 text-sm mt-1" />
                        </div>

                        {/* Meta Description */}
                        <div>
                            <label htmlFor="metaDescription" className="block text-lg  text-white font-Tanha">توضیحات متا</label>
                            <Field
                                type="text"
                                name="metaDescription"
                                id="metaDescription"
                                className="mt-3 p-4 w-full border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg shadow-md font-vazir"
                            />
                            <ErrorMessage name="metaDescription" component="div" className="font-vazir text-red-400 text-sm mt-1" />
                        </div>

                        {/* Parent ID (Optional) */}
                        <div>
                            <label htmlFor="parentId" className="block text-lg  text-white font-Tanha">برچسب والد (اختیاری)</label>
                            <Select
                                name="parentId"
                                id="parentId"
                                options={formattedTags}
                                className="mt-3 w-full text-lg font-shabnam border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-lg hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-300 ease-in-out"
                                classNamePrefix="custom-select"
                                placeholder="انتخاب برچسب والد"
                                onChange={(option) => setFieldValue("parentId", option ? option.value : undefined)}
                                isLoading={tagsLoading}
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
                            disabled={tagsLoading || isSubmitting}
                            className={`mt-6 w-full p-4 text-white text-xl font-Tanha ${tagsLoading || isSubmitting ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'} rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg`}
                        >
                            {tagsLoading || isSubmitting ? 'در حال ایجاد...' : 'ایجاد برچسب'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CreatingTag;
