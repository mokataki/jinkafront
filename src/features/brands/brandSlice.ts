import {
    createBrand,
    deleteBrand,
    fetchBrands,
    updateBrand
} from "./brandThunks";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define Brand and BrandState types
interface Brand {
    id: number;
    slug: string;
    brandName: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    products: any[]; // Replace with specific product type if available
    articles: any[]; // Replace with specific article type if available
}

interface BrandState {
    brands: Brand[];
    brand: Brand | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

// Initial state
const initialState: BrandState = {
    brands: [],
    brand: null,
    status: "idle",
    error: null,
};

const brandsSlice = createSlice({
    name: "brands",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch all brands
            .addCase(fetchBrands.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchBrands.fulfilled, (state, action: PayloadAction<Brand[]>) => {
                state.status = "succeeded";
                state.brands = action.payload;
            })
            .addCase(fetchBrands.rejected, (state, action: PayloadAction<any>) => {
                state.status = "failed";
                state.error = action.payload as string;
            })

            // Create brand
            .addCase(createBrand.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(createBrand.fulfilled, (state, action: PayloadAction<Brand>) => {
                state.status = "succeeded";
                state.brands.push(action.payload);
            })
            .addCase(createBrand.rejected, (state, action: PayloadAction<any>) => {
                state.status = "failed";
                state.error = action.payload as string;
            })

            // Update brand
            .addCase(updateBrand.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updateBrand.fulfilled, (state, action: PayloadAction<Brand>) => {
                state.status = "succeeded";
                const index = state.brands.findIndex(
                    (brand) => brand.id === action.payload.id
                );
                if (index !== -1) {
                    state.brands[index] = action.payload;
                }
            })
            .addCase(updateBrand.rejected, (state, action: PayloadAction<any>) => {
                state.status = "failed";
                state.error = action.payload as string;
            })

            // Delete brand
            .addCase(deleteBrand.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(deleteBrand.fulfilled, (state, action: PayloadAction<number>) => {
                state.status = "succeeded";
                state.brands = state.brands.filter(
                    (brand) => brand.id !== action.payload
                );
            })
            .addCase(deleteBrand.rejected, (state, action: PayloadAction<any>) => {
                state.status = "failed";
                state.error = action.payload as string;
            });
    },
});

export default brandsSlice.reducer;
