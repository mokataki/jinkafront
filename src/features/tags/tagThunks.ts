import { createAsyncThunk } from '@reduxjs/toolkit';
import baseApi from "../../api/baseApi.ts";
import { AxiosError } from "axios";

// Defining the type for the parameters of the async thunk
interface FetchTagsParams {
    page?: number;
    limit?: number;
    search?: string;
    parentId?: number;
    fetchAll?: boolean;  // Option to fetch all tags, bypassing pagination

}

// Fetch tags with pagination, search, and parent filtering
export const fetchTags = createAsyncThunk<'tags/fetchTags', FetchTagsParams>(
    'tags/fetchTags',
    async ({ page = 1, limit = 10, search = '', parentId, fetchAll = false }: FetchTagsParams) => {
        try {
            // If fetchAll is true, we can bypass pagination by setting a large limit.
            // For example, set a limit of 1000 if fetching all tags.
            const finalLimit = fetchAll ? 1000 : limit;

            const response = await baseApi.get('/tags', {
                params: { page, limit: finalLimit, search, parentId },
            });

            // Log full response for debugging
            console.log('Full API Response:', response);

            // Validate the response data structure
            if (Array.isArray(response.data.tags)) {
                return response.data.tags;
            } else {
                throw new Error('Invalid data format: Expected an array of tags inside "tags" field');
            }
        } catch (error) {
            // Error handling with detailed logging
            console.error('Error fetching tags:', error);
            // Provide an appropriate error message for the user
            throw new Error('خطا در دریافت برچسب‌ها. لطفاً دوباره تلاش کنید.');
        }
    }
);

// Create a new tag
interface NewTag {
    name: string;
    parentId?: number;
    metaTitle?: string;
    metaDescription?: string;
}

export const createTag = createAsyncThunk(
    'tags/createTag',
    async (newTag: NewTag, { rejectWithValue, dispatch }) => {
        try {
            const response = await baseApi.post('/tags', newTag);
            dispatch(fetchTags({ page: 1, limit: 10 })); // Re-fetch the tags after creating a new one
            return response.data; // Return the data from the response
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data || 'Failed to create tag');
            }
            return rejectWithValue('An unknown error occurred');
        }
    }
);

// Update an existing tag

interface UpdateTag {
    id: number;
    name: string;
    parentId?: number;
    metaTitle?: string;
    metaDescription?: string;
}

export const updateTag = createAsyncThunk(
    'tags/updateTag',
    async (tag: UpdateTag, { rejectWithValue }) => {
        try {
            const { id, ...updatePayload } = tag; // Exclude the `id` field from the payload
            console.log('Payload sent to API:', updatePayload); // Debugging
            const response = await baseApi.patch(`/tags/${id}`, updatePayload); // Use `id` in the URL, not in the body
            return response.data;
        } catch (error: any) {
            console.error('Failed to update tag:', error.response?.data || error.message);
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue('An unexpected error occurred while updating the tag.');
        }
    }
);



// Delete a tag
export const deleteTag = createAsyncThunk(
    'tags/deleteTag',
    async (id: number) => {
        await baseApi.delete(`/tags/${id}`);
        return id;
    }
);
