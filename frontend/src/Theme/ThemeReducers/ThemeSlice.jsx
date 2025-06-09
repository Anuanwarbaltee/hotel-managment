import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    themeMod: "dark"
};

const themeSlice = createSlice({
    name: 'themes',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.themeMod = action.payload
        },
    },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;