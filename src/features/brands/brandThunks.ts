import { createAsyncThunk } from "@reduxjs/toolkit";
import baseApi from "../../api/baseApi.ts";
import { AxiosError } from "axios";

// Define parameters for fetching brands
interface FetchBrandsParams {
    page?: number;
    limit?: number;
    search?: string;
    fetchAll?: boolean; // Option to fetch all brands, bypassing pagination
}

// Fetch brands with pagination, search, and option to fetch all
export const fetchBrands = createAsyncThunk(
    "brands/fetchBrands",
    async (
        { page = 1, limit = 10, search = "", fetchAll = false }: FetchBrandsParams,
        { rejectWithValue }
    ) => {
        try {
            const finalLimit = fetchAll ? 1000 : limit;

            const response = await baseApi.get("/brands", {
                params: { page, limit: finalLimit, search },
            });

            console.log("Full API Response:", response);

            if (Array.isArray(response.data)) {
                return response.data; // Return the array of brands directly
            } else {
                console.error("Unexpected response structure:", response.data);
                throw new Error("Invalid data format: Expected an array of brands");
            }
        } catch (error: any) {
            console.error("Error fetching brands:", error);
            if (error.response) {
                return rejectWithValue(error.response?.data || "خطا در دریافت برندها. لطفاً دوباره تلاش کنید.");
            }
            return rejectWithValue("خطا در دریافت برندها. لطفاً دوباره تلاش کنید.");
        }
    }
);

// Define parameters for creating a new brand
interface NewBrand {
    brandName: string;
}

// Create a new brand
export const createBrand = createAsyncThunk(
    "brands/createBrand",
    async (newBrand: NewBrand, { rejectWithValue }) => {
        try {
            const response = await baseApi.post("/brands", newBrand);
            return response.data; // Return created brand directly
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data || "Failed to create brand");
            }
            return rejectWithValue("An unknown error occurred");
        }
    }
);

// Define parameters for updating a brand
interface UpdateBrand {
    id: number;
    brandName: string;
}

// Update an existing brand
export const updateBrand = createAsyncThunk(
    "brands/updateBrand",
    async (brand: UpdateBrand, { rejectWithValue }) => {
        try {
            const { id, ...updatePayload } = brand; // Exclude `id` from the payload
            console.log("Payload sent to API:", updatePayload); // Debugging
            const response = await baseApi.patch(`/brands/${id}`, updatePayload); // Use `id` in the URL
            return response.data;
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data || "Failed to update brand");
            }
            return rejectWithValue("An unexpected error occurred while updating the brand");
        }
    }
);

// Delete a brand
export const deleteBrand = createAsyncThunk(
    "brands/deleteBrand",
    async (id: number, { rejectWithValue }) => {
        try {
            await baseApi.delete(`/brands/${id}`);
            return id; // Return the ID of the deleted brand
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data || "Failed to delete brand");
            }
            return rejectWithValue("An unknown error occurred");
        }
    }
);
