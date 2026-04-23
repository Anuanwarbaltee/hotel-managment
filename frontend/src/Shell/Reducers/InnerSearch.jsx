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
// export default searchSlice.reducer

const counterReducer = createSlice({
    name: "count",
    initialState: { value: 0, name: "ali", age: 20 },
    reducers: {
        increment: (state) => {
            state.value += 1
            state.name = "Anu"
            state.age = 29
        },
        decrement: (state) => {
            state.value -= 1
            state.name = "zahoor"
            state.age = 26
        }
    }
})

export const { increment, decrement } = counterReducer.actions;
export default counterReducer.reducer