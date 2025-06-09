import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    filters: {
        location: "",
        checkIn: null,
        checkOut: null,
        price: 0
    }
}

const searchSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        addFilters: (state, action) => {
            state.filters = action.payload
        }
    }
})

export const { addFilters } = searchSlice.actions;
export default searchSlice.reducer