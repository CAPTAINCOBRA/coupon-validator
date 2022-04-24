import { configureStore } from "@reduxjs/toolkit";

import couponSlice from "../redux/Coupons/couponSlice";

export const store = configureStore({
  reducer: {
    coupon: couponSlice.reducer,
  },
});
