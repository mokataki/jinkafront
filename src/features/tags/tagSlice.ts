import { createSlice } from '@reduxjs/toolkit';
import { createTag, updateTag, deleteTag, fetchTags } from './tagThunks';

interface Tag {
    id: number;
    slug: string;
    name: string;
    metaTitle?: string;
    metaDescription?: string;
    parentId?: number;
    parent?: Tag | null;
    children: Tag[];
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    products: any[]; // Adjust according to Product model structure
    articles: any[]; // Adjust according to Article model structure
}

interface TagState {
    tags: Tag[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: TagState = {
    tags: [],
    status: 'idle',
    error: null,
};

const tagSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {
        addTag: (state, action) => {
            state.tags.push(action.payload); // Add new tag to the list
        },
        removeTag: (state, action) => {
            state.tags = state.tags.filter((tag) => tag.id !== action.payload);
        },
        updateTagInState: (state, action) => {
            const index = state.tags.findIndex((tag) => tag.id === action.payload.id);
            if (index !== -1) {
                state.tags[index] = action.payload; // Update tag in the list
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTags.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTags.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tags = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchTags.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Error fetching tags';
            })
            .addCase(createTag.fulfilled, (state, action) => {
                state.tags.push(action.payload); // Optimistically add the new tag
            })
            .addCase(updateTag.fulfilled, (state, action) => {
                const index = state.tags.findIndex((tag) => tag.id === action.payload.id);
                if (index !== -1) {
                    state.tags[index] = action.payload; // Update tag
                }
            })
            .addCase(deleteTag.fulfilled, (state, action) => {
                state.tags = state.tags.filter((tag) => tag.id !== action.payload); // Remove deleted tag
            });
    },
});

export default tagSlice.reducer;
