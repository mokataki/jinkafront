import { createAsyncThunk } from "@reduxjs/toolkit";
import baseApi from "../../api/baseApi.ts";
import { AxiosError } from "axios";

// Define parameters for fetching colors
interface FetchColorsParams {
    page?: number;
    limit?: number;
    search?: string;
    fetchAll?: boolean; // Option to fetch all colors, bypassing pagination
}

// Fetch colors with pagination, search, and option to fetch all
export const fetchColors = createAsyncThunk(
    "colors/fetchColors",
    async (
        { page = 1, limit = 10, search = "", fetchAll = false }: FetchColorsParams,
        { rejectWithValue }
    ) => {
        try {
            const finalLimit = fetchAll ? 1000 : limit;

            const response = await baseApi.get("/colors", {
                params: { page, limit: finalLimit, search },
            });

            console.log("Full API Response:", response);

            if (Array.isArray(response.data)) {
                return response.data; // Return the array of colors directly
            } else {
                console.error("Unexpected response structure:", response.data);
                throw new Error("Invalid data format: Expected an array of colors");
            }
        } catch (error: any) {
            console.error("Error fetching colors:", error);
            if (error.response) {
                return rejectWithValue(error.response?.data || "خطا در دریافت رنگ‌ها. لطفاً دوباره تلاش کنید.");
            }
            return rejectWithValue("خطا در دریافت رنگ‌ها. لطفاً دوباره تلاش کنید.");
        }
    }
);

// Define parameters for creating a new color
interface NewColor {
    color: string;
}

// Create a new color
export const createColor = createAsyncThunk(
    "colors/createColor",
    async (newColor: NewColor, { rejectWithValue }) => {
        try {
            const response = await baseApi.post("/colors", newColor);
            return response.data; // Return created color directly
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data || "Failed to create color");
            }
            return rejectWithValue("An unknown error occurred");
        }
    }
);

// Define parameters for updating a color
interface UpdateColor {
    id: number;
    color: string;
}

// Update an existing color
export const updateColor = createAsyncThunk(
    "colors/updateColor",
    async (color: UpdateColor, { rejectWithValue }) => {
        try {
            const { id, ...updatePayload } = color; // Exclude `id` from the payload
            console.log("Payload sent to API:", updatePayload); // Debugging
            const response = await baseApi.patch(`/colors/${id}`, updatePayload); // Use `id` in the URL
            return response.data;
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data || "Failed to update color");
            }
            return rejectWithValue("An unexpected error occurred while updating the color");
        }
    }
);

// Delete a color
export const deleteColor = createAsyncThunk(
    "colors/deleteColor",
    async (id: number, { rejectWithValue }) => {
        try {
            await baseApi.delete(`/colors/${id}`);
            return id; // Return the ID of the deleted color
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data || "Failed to delete color");
            }
            return rejectWithValue("An unknown error occurred");
        }
    }
);
