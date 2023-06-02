import { createSlice } from "@reduxjs/toolkit";
let cart = JSON.parse(localStorage.getItem("cart"));
let quantity = JSON.parse(localStorage.getItem("quantity"));

const initialState = {
  cartItems: cart?.cartItems || [],
  quantity: quantity || 0,
  totalPrice: cart?.totalPrice || 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const productId = action.payload;
      const exist = state.cartItems.find(
        (product) => product._id === productId._id
      );

      if (exist) {
        return;
        // toast.warning("Product Already Exists");
      } else {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
          singlePrice: parseInt(action.payload.price),
        });
        state.quantity += 1;
      }
      state.totalPrice = state.totalPrice + parseInt(action.payload.price);

      localStorage.setItem(
        "cart",
        JSON.stringify({
          cartItems: state.cartItems,
          totalPrice: state.totalPrice,
        })
      );
      localStorage.setItem("quantity", JSON.stringify(state.quantity));
    },
    increment: (state, action) => {
      const productId = action.payload;
      const exist = state.cartItems.find(
        (product) => product._id === productId
      );
      if (exist) {
        exist.quantity++;
        exist.singlePrice = exist.singlePrice + parseInt(exist.price);
        state.totalPrice = state.totalPrice + parseInt(exist.price);
      }
      localStorage.setItem(
        "cart",
        JSON.stringify({
          cartItems: state.cartItems,
          totalPrice: state.totalPrice,
        })
      );
    },
    decrement: (state, action) => {
      const productId = action.payload;
      const exist = state.cartItems.find(
        (product) => product._id === productId
      );
      if (exist) {
        if (exist.quantity !== 1) {
          exist.quantity--;
          exist.singlePrice = exist.singlePrice - parseInt(exist.price);
          state.totalPrice = state.totalPrice - parseInt(exist.price);
        }
      }
      localStorage.setItem(
        "cart",
        JSON.stringify({
          cartItems: state.cartItems,
          totalPrice: state.totalPrice,
        })
      );
    },
    removeItem: (state, action) => {
      const productId = action.payload;
      const exist = state.cartItems.findIndex(
        (product) => product._id === productId
      );
      if (exist !== -1) {
        const itemToRemove = state.cartItems[exist];
        state.cartItems.splice(exist, 1);
        state.quantity -= 1;
        state.totalPrice -= itemToRemove.singlePrice;
      }
      localStorage.setItem(
        "cart",
        JSON.stringify({ ...state.cartItems, totalPrice: state.totalPrice })
      );
      localStorage.setItem("quantity", JSON.stringify(state.quantity));
    },
  },
});

export default cartSlice.reducer;
export const { addItem, increment, decrement, removeItem } = cartSlice.actions;
