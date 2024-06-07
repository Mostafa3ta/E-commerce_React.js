import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const FavouriteSlice = createSlice({
    name: 'favourite',
    initialState: {
        favItems: localStorage.getItem("favItems")
            ? JSON.parse(localStorage.getItem("favItems"))
            : [],
        isFav: false
    },
    reducers: {
        AddToFav: (state, action) => {
            const existingIndex = state.favItems.findIndex(
                (item) => item?.id === action.payload?.id
            );
            if (existingIndex >= 0) {
                toast.warning(`${action.payload.title.split(' ').slice(0, 2).join(' ')} alredy in your wishlist`, {
                    position: "bottom-left",
                });
            } else {
                let tempProductItem = { ...action.payload, isFav: true };
                state.favItems.push(tempProductItem);
                toast.success(`${action.payload.title.split(' ').slice(0, 2).join(' ')} added to wishlist`, {
                    position: "bottom-left",
                });
            }
            localStorage.setItem("favItems", JSON.stringify(state.favItems));
        },
        RemoveFromFav: (state, action) => {
            state.favItems.map((cartItem) => {
                if (cartItem.id === action.payload.id) {
                    const nextCartItems = state.favItems.filter(
                        (item) => item.id !== cartItem.id
                    );
                    state.favItems = nextCartItems;
                    toast.error(`${cartItem.title.split(' ').slice(0, 2).join(' ')} removed from wishlist`, {
                        position: "bottom-left",
                    });
                }
                localStorage.setItem("favItems", JSON.stringify(state.favItems));
                return state;
            });
        },
        clearFav(state, action) {
            state.favItems = [];
            localStorage.setItem("favItems", JSON.stringify(state.favItems));
            toast.error("Wishlist has been cleared", { position: "bottom-left" });
        },
    }
})

export default FavouriteSlice.reducer
export const { AddToFav, RemoveFromFav, clearFav } = FavouriteSlice.actions