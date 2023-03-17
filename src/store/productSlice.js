import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Action
export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
    const response = await fetch(
        "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
    );
    return response.json();
});

const productSlice = createSlice({
    name: "products",
    initialState: {
        isLoading: false,
        data: [],
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isError = true;
        });
    }
});

export default productSlice.reducer;
