import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        state.cartItems.push({ ...payload, quantity: 1 });
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    remove: (state, { payload }) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== payload.id
      );
    },

    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.quantity += 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.quantity -= 1;
    },
    calculateTotals: (state) => {
      const { amount, total } = state.cartItems.reduce(
        (acc, cur) => {
          let { amount, total } = acc;
          amount += cur.quantity;
          total += cur.quantity * cur.price;
          return { amount, total };
        },
        {
          amount: 0,
          total: 0,
        }
      );

      state.amount = amount;
      state.total = total;
    },
  },
});

export const {
  addToCart,
  remove,
  increase,
  decrease,
  clearCart,
  calculateTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
