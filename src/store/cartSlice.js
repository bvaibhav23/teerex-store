import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            const itemInCart = state.find((item) => item.id === action.payload.id);
            if (itemInCart) {
                if (itemInCart.quantityInCart < itemInCart.quantity)
                    itemInCart.quantityInCart++;
                else alert("No more stock available");
            } else {
                state.push({ ...action.payload, quantityInCart: 1 });
            }
        },
        decreaseCount: (state, action) => {
            const itemInCart = state.find((item) => item.id === action.payload.id);
            if (itemInCart) {
                itemInCart.quantityInCart--;
                if (itemInCart.quantityInCart === 0) {
                    let index = state.findIndex((itm) => itm.quantityInCart === 0);
                    state.splice(index, 1);
                }
            }
        },
        deleteFromCart: (state, action) => {
            const index = state.findIndex((item) => item.id === action.payload.id);
            state.splice(index, 1);
        }
    }
});

export const { addToCart, decreaseCount, deleteFromCart } = cartSlice.actions;

export default cartSlice.reducer;
