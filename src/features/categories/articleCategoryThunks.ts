import { createAsyncThunk } from "@reduxjs/toolkit";
import baseApi from "../../api/baseApi.ts";
import { AxiosError } from "axios";
import {RootState} from "../../store";

// Define parameters for fetching categories
interface FetchCategoriesParams {
    page?: number;
    limit?: number;
    search?: string;
    parentId?: number;
    fetchAll?: boolean; // Option to fetch all categories, bypassing pagination
}

// Fetch categories with pagination, search, and parent filtering
export const fetchArticleCategories = createAsyncThunk(
    "categories/fetchCategories",
    async (
        { page = 1, limit = 10, search = "", parentId, fetchAll = false }: FetchCategoriesParams,
        { rejectWithValue }
    ) => {
        try {
            const finalLimit = fetchAll ? 1000 : limit;

            const response = await baseApi.get("/article-categories", { // Updated path
                params: { page, limit: finalLimit, search, parentId },
            });

            console.log("Full API Response:", response);

            // Check if the response data is an array directly
            if (Array.isArray(response.data)) {
                return response.data; // Directly return the array of categories
            } else {
                // Log more information to debug the response structure
                console.error("Unexpected response structure:", response.data);
                throw new Error(
                    'Invalid data format: Expected an array of categories'
                );
            }
        } catch (error: any) {
            console.error("Error fetching categories:", error);
            // Handle AxiosError specifically
            if (error.response) {
                return rejectWithValue(error.response?.data || "خطا در دریافت دسته‌بندی‌ها. لطفاً دوباره تلاش کنید.");
            }
            // If it's an unexpected error
            return rejectWithValue("خطا در دریافت دسته‌بندی‌ها. لطفاً دوباره تلاش کنید.");
        }
    }
);

// Define parameters for creating a new category
interface NewCategory {
    categoryName: string;
    categoryDescription?: string;
    parentId?: number;
}

// Create a new category
export const createArticleCategory = createAsyncThunk(
    "categories/createCategory",
    async (newCategory: NewCategory, { rejectWithValue }) => {
        try {
            const response = await baseApi.post("/article-categories", newCategory); // Updated path
            return response.data;  // Return created category directly
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data || "Failed to create category");
            }
            return rejectWithValue("An unknown error occurred");
        }
    }
);

// Define parameters for updating a category
interface UpdateArticleCategory {
    id: number;
    categoryName: string;
    categoryDescription?: string;
    parentId?: number;
}

// Update an existing category
export const updateArticleCategory = createAsyncThunk(
    "categories/updateCategory",
    async (category: UpdateArticleCategory, { rejectWithValue }) => {
        try {
            const { id, ...updatePayload } = category; // Exclude `id` from the payload
            console.log("Payload sent to API:", updatePayload); // Debugging
            const response = await baseApi.patch(`/article-categories/${id}`, updatePayload); // Updated path
            return response.data;
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data || "Failed to update category");
            }
            return rejectWithValue("An unexpected error occurred while updating the category");
        }
    }
);

// Delete a category
export const deleteArticleCategory = createAsyncThunk(
    "categories/deleteCategory",
    async (id: number, { rejectWithValue, getState }) => {
        const state: RootState = getState() as RootState;
        const category = state.categories.categories.find((cat) => cat.id === id);

        // Check if the category has a parent before sending the request
        if (category?.parentId) {
            return rejectWithValue({
                message: "این دسته‌بندی دارای والد است و نمی‌توان آن را حذف کرد.",
            });
        }

        try {
            await baseApi.delete(`/article-categories/${id}`);
            return id; // Return the ID of the deleted category
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                // Extract and return the server's error message
                return rejectWithValue(error.response?.data || {
                    message: "Failed to delete category",
                });
            }
            return rejectWithValue({
                message: "An unknown error occurred",
            });
        }
    }
);

