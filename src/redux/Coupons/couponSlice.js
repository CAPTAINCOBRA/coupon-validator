import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  couponValue: 0,
  couponCode: "",
  minOrderValue: 0,
  couponStartDate: "",
  couponExpiryDate: "",
  couponType: "flat",
  // serverUrl: "http://localhost:7000/coupons",
  serverUrl: "https://ek-coupon-server.herokuapp.com/coupons",
  orderValue: 0,
  allCoupons: [],
  couponValidation: {
    isValid: false,
    message: "",
    status: "",
  },
  discountValue: "",
  loader: false,
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    updateState: (state, action) => {
      const { key, value } = action.payload;
      return {
        ...state,
        [key]: value,
      };
    },
  },
});

export const couponSliceAction = couponSlice.actions;
export default couponSlice;
