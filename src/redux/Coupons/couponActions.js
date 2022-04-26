import { couponSliceAction } from "./couponSlice";
import { callMyServer } from "../../utilities/utilityAPIs";
import axios from "axios";
import CustomToast from "../../components/CustomToast/CustomToast";
import { toast } from "react-toastify";

export const createCoupon = () => {
  return async (dispatch, getState) => {
    const {
      couponValue,
      couponCode,
      minOrderValue,
      couponStartDate,
      couponExpiryDate,
      couponType,
      serverUrl,
    } = getState().coupon;

    const url = "/createCoupon";
    const data = {
      couponValue,
      couponCode,
      minOrderValue,
      couponStartDate,
      couponExpiryDate,
      couponType,
    };
    const responseMiniServer = callMyServer(url, data, serverUrl);

    try {
      const res = await axios.post(responseMiniServer.url, {
        data: responseMiniServer.JSONData,
      });
      if (res.status === 200) {
        dispatch(fetchAllCoupons());

        const msg = (
          <CustomToast err={false} msg="Coupon Created Successfully" />
        );

        toast.success(msg, {
          className: "ToastSucc Toast",
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        const msg = <CustomToast err={true} msg="Coupon Creation Failed" />;

        toast.error(msg, {
          className: "ToastErr Toast",
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.log(error);
      const msg = <CustomToast err={true} msg="Coupon Creation Failed" />;

      toast.error(msg, {
        className: "ToastErr Toast",
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
};

export const fetchAllCoupons = () => {
  return async (dispatch, getState) => {
    dispatch(couponSliceAction.updateState({ key: "loader", value: true }));
    const { serverUrl } = getState().coupon;
    const url = "/fetchAllCoupons";
    const responseMiniServer = callMyServer(url, "", serverUrl);

    try {
      const res = await axios.get(responseMiniServer.url, {
        data: responseMiniServer.JSONData,
      });
      if (res.status === 200) {
        dispatch(
          couponSliceAction.updateState({ key: "allCoupons", value: res.data })
        );
        dispatch(
          couponSliceAction.updateState({ key: "loader", value: false })
        );
      } else {
        dispatch(
          couponSliceAction.updateState({ key: "loader", value: false })
        );
        const msg = (
          <CustomToast
            err={true}
            msg="Unable to Fetch Coupons. Contact Administrator!"
          />
        );

        toast.error(msg, {
          className: "ToastErr Toast",
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.log(error);
      const msg = (
        <CustomToast
          err={true}
          msg="Unable to Fetch Coupons. Contact Administrator!"
        />
      );

      toast.error(msg, {
        className: "ToastErr Toast",
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
};

export const validateCoupon = () => {
  return async (dispatch, getState) => {
    dispatch(couponSliceAction.updateState({ key: "loader", value: true }));
    const { serverUrl, discountValue, orderValue } = getState().coupon;
    const url = "/validateCoupon";
    const data = { discountValue, orderValue };
    const responseMiniServer = callMyServer(url, data, serverUrl);

    try {
      const res = await axios.post(responseMiniServer.url, {
        data: responseMiniServer.JSONData,
      });
      if (res.data.status === 200) {
        dispatch(
          couponSliceAction.updateState({ key: "loader", value: false })
        );

        dispatch(
          couponSliceAction.updateState({
            key: "couponValidation",
            value: res.data,
          })
        );

        const msg = (
          <CustomToast err={false} msg="Coupon Applied Successfully" />
        );

        toast.success(msg, {
          className: "ToastSucc Toast",
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        dispatch(
          couponSliceAction.updateState({ key: "loader", value: false })
        );

        dispatch(
          couponSliceAction.updateState({
            key: "couponValidation",
            value: res.data,
          })
        );
        const msg = <CustomToast err={true} msg="Coupon Not Applied" />;

        toast.error(msg, {
          className: "ToastErr Toast",
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      dispatch(couponSliceAction.updateState({ key: "loader", value: false }));

      console.log(error);
      const msg = <CustomToast err={true} msg="Coupon Not Applied" />;

      toast.error(msg, {
        className: "ToastErr Toast",
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
};
