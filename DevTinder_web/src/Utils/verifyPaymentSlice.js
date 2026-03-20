import { createSlice } from "@reduxjs/toolkit";

const VerifyPaymentSlice = createSlice({
  name: "VerifyPayment",
  initialState: null,
  reducers: {
    isPremium: (state, action) => {
      return action.payload;
    },
  },
});

export const { isPremium } = VerifyPaymentSlice.actions;
export default VerifyPaymentSlice.reducer;
