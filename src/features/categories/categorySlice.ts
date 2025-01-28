import {
    createCategory,
    deleteCategory,
    fetchCategories,
    updateCategory
} from "./categoryThunks";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define Category and CategoryState types
interface Category {
    id: number;
    slug: string;
    categoryName: string;
    categoryDescription: string;
    isDeleted: boolean;
    parentId?: number;
    parent?: Category | null;
    children: Category[];
    createdAt: string;
    updatedAt: string;
    products: any[]; // Replace with a specific type if available
}

interface CategoryState {
    categories: Category[];
    category: Category | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

// Initial state
const initialState: CategoryState = {
    categories: [],
    category: null,
    status: "idle",
    error: null,
};

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch all categories
            .addCase(fetchCategories.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
                state.status = "succeeded";
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action: PayloadAction<any>) => {
                state.status = "failed";
                state.error = action.payload as string;
            })

            // Create category
            .addCase(createCategory.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(createCategory.fulfilled, (state, action: PayloadAction<Category>) => {
                state.status = "succeeded";
                state.categories.push(action.payload);
            })
            .addCase(createCategory.rejected, (state, action: PayloadAction<any>) => {
                state.status = "failed";
                state.error = action.payload as string;
            })

            // Update category
            .addCase(updateCategory.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updateCategory.fulfilled, (state, action: PayloadAction<Category>) => {
                state.status = "succeeded";
                const index = state.categories.findIndex(
                    (category) => category.id === action.payload.id
                );
                if (index !== -1) {
                    state.categories[index] = action.payload;
                }
            })
            .addCase(updateCategory.rejected, (state, action: PayloadAction<any>) => {
                state.status = "failed";
                state.error = action.payload as string;
            })

            // Delete category
            .addCase(deleteCategory.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(deleteCategory.fulfilled, (state, action: PayloadAction<number>) => {
                state.status = "succeeded";
                state.categories = state.categories.filter(
                    (category) => category.id !== action.payload
                );
            })
            .addCase(deleteCategory.rejected, (state, action: PayloadAction<any>) => {
                state.status = "failed";
                state.error = action.payload as string;
            });
    },
});

export default categoriesSlice.reducer;
