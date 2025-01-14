import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {RootState} from "../../store";

interface UsersState {
    users: any[];
    isLoading: boolean;
}

const initialState: UsersState = {
    users: [],
    isLoading: false,
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<any[]>) => {
            state.users = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setUsers, setLoading } = usersSlice.actions;
export const selectUsers = (state: RootState) => state.users;
export default usersSlice.reducer;
