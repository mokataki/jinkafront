import {
    createColor,
    deleteColor,
    fetchColors,
    updateColor
} from "./colourThunks";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define Color and ColorState types
interface Color {
    id: number;
    slug: string;
    color: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    products: any[]; // Replace with specific product type if available
    articles: any[]; // Replace with specific article type if available
    articleId?: number | null;
}

interface ColorState {
    colors: Color[];
    color: Color | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

// Initial state
const initialState: ColorState = {
    colors: [],
    color: null,
    status: "idle",
    error: null,
};

const colorsSlice = createSlice({
    name: "colors",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch all colors
            .addCase(fetchColors.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchColors.fulfilled, (state, action: PayloadAction<Color[]>) => {
                state.status = "succeeded";
                state.colors = action.payload;
            })
            .addCase(fetchColors.rejected, (state, action: PayloadAction<any>) => {
                state.status = "failed";
                state.error = action.payload as string;
            })

            // Create color
            .addCase(createColor.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(createColor.fulfilled, (state, action: PayloadAction<Color>) => {
                state.status = "succeeded";
                state.colors.push(action.payload);
            })
            .addCase(createColor.rejected, (state, action: PayloadAction<any>) => {
                state.status = "failed";
                state.error = action.payload as string;
            })

            // Update color
            .addCase(updateColor.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updateColor.fulfilled, (state, action: PayloadAction<Color>) => {
                state.status = "succeeded";
                const index = state.colors.findIndex(
                    (color) => color.id === action.payload.id
                );
                if (index !== -1) {
                    state.colors[index] = action.payload;
                }
            })
            .addCase(updateColor.rejected, (state, action: PayloadAction<any>) => {
                state.status = "failed";
                state.error = action.payload as string;
            })

            // Delete color
            .addCase(deleteColor.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(deleteColor.fulfilled, (state, action: PayloadAction<number>) => {
                state.status = "succeeded";
                state.colors = state.colors.filter(
                    (color) => color.id !== action.payload
                );
            })
            .addCase(deleteColor.rejected, (state, action: PayloadAction<any>) => {
                state.status = "failed";
                state.error = action.payload as string;
            });
    },
});

export default colorsSlice.reducer;
