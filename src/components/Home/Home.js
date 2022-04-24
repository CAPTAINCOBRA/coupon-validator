import { Button, Modal, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { couponSliceAction } from "../../redux/Coupons/couponSlice";
import * as actions from "../../redux/Coupons/couponActions";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchAllCoupons());
  }, []);

  const couponData = useSelector((state) => state.coupon);

  const [show, setShow] = useState(false);

  const onClick = () => setShow(true);
  const handleClose = () => setShow(false);

  const onSubmit = (e) => {
    e.preventDefault();

    const {
      couponValue,
      couponCode,
      minOrderValue,
      couponStartDate,
      couponExpiryDate,
      couponType,
    } = couponData;

    if (
      couponValue === 0 ||
      couponCode === "" ||
      minOrderValue === 0 ||
      couponStartDate.toString() == null ||
      couponStartDate.toString() == undefined ||
      couponStartDate.toString() == "" ||
      couponExpiryDate.toString() == null ||
      couponExpiryDate.toString() == undefined ||
      couponExpiryDate.toString() == "" ||
      couponType === "" ||
      minOrderValue === "" ||
      couponValue === ""
    ) {
      alert("Please fill all the fields");
    } else {
      dispatch(actions.createCoupon());
      setShow(false);
    }
  };

  const onValidate = (e) => {
    e.preventDefault();

    if (couponData.orderValue === 0 || couponData.orderValue === null) {
      dispatch(
        couponSliceAction.updateState({
          key: "couponValidation",
          value: { isValid: false, message: "Please enter order value" },
        })
      );
    } else if (
      couponData.discountValue === "" ||
      couponData.discountValue === null ||
      couponData.discountValue === "Discount Code"
    ) {
      dispatch(
        couponSliceAction.updateState({
          key: "couponValidation",
          value: { isValid: false, message: "Please select the coupon code" },
        })
      );
    } else {
      dispatch(actions.validateCoupon());
    }
  };

  const onCouponValueChange = (e) => {
    dispatch(
      couponSliceAction.updateState({
        key: "couponValue",
        value: e.target.value,
      })
    );
  };
  const onCouponCodeChange = (e) => {
    dispatch(
      couponSliceAction.updateState({
        key: "couponCode",
        value: e.target.value,
      })
    );
  };
  const onMinOrderValueChange = (e) => {
    dispatch(
      couponSliceAction.updateState({
        key: "minOrderValue",
        value: e.target.value,
      })
    );
  };
  const onCouponStartDateChange = (e) => {
    dispatch(
      couponSliceAction.updateState({
        key: "couponStartDate",
        value: e.target.value,
      })
    );
  };
  const onCouponExpiryDateChange = (e) => {
    dispatch(
      couponSliceAction.updateState({
        key: "couponExpiryDate",
        value: e.target.value,
      })
    );
  };
  const onCouponTypeChange = (e) => {
    dispatch(
      couponSliceAction.updateState({
        key: "couponType",
        value: e.target.value,
      })
    );
  };

  const onOrderValueChange = (e) => {
    dispatch(
      couponSliceAction.updateState({
        key: "orderValue",
        value: e.target.value,
      })
    );
  };

  const onDiscountValueChange = (e) => {
    dispatch(
      couponSliceAction.updateState({
        key: "discountValue",
        value: e.target.value,
      })
    );
  };

  return (
    <div>
      <div class="p-3 mb-2 bg-secondary text-white">
        Ekansh Baweja - Coupon Validator Assignment
      </div>

      <Button className="mt-3" variant="primary" onClick={onClick}>
        Create Coupon
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Coupon</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Coupon Value</Form.Label>
              <Form.Control
                type="number"
                placeholder="Example (In Rupees) - 150"
                autoFocus
                name="couponValue"
                onChange={onCouponValueChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Coupon Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Example - GET50"
                name="couponCode"
                onChange={onCouponCodeChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Minimum Amount of Order</Form.Label>
              <Form.Control
                type="number"
                placeholder="Example - 100"
                name="minOrderValue"
                onChange={onMinOrderValueChange}
              />
            </Form.Group>

            <Form.Select
              aria-label="Default select example"
              onChange={onCouponTypeChange}
            >
              <option>Type of Coupon</option>
              <option value="flat">Flat</option>
              <option value="percentage">Percentage</option>
            </Form.Select>

            <Form.Group
              className="mb-3 mt-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Coupon Start Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="name@example.com"
                name="couponStartDate"
                onChange={onCouponStartDateChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Coupon Expiry Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="name@example.com"
                name="couponExpiryDate"
                onChange={onCouponExpiryDateChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary" onClick={onSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Form className="w-50 align-center m-auto mt-5">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Enter Amount of Order</Form.Label>
          <Form.Control
            type="number"
            placeholder="Example - 100"
            name="orderValue"
            onChange={onOrderValueChange}
          />
        </Form.Group>

        <Form.Select
          aria-label="Default select example"
          onChange={onDiscountValueChange}
        >
          <option>Discount Code</option>
          {couponData.allCoupons.map((coupon) => (
            <option key={coupon._id} value={coupon.id}>
              {coupon.couponCode}
            </option>
          ))}
          {/* <option value="GET10">This will come from DB</option> */}
        </Form.Select>

        {!couponData.couponValidation.isValid && (
          <h6 className="text-danger mt-2">
            {couponData.couponValidation.message}
          </h6>
        )}

        <Button
          className="mt-5"
          type="submit"
          variant="primary"
          onClick={onValidate}
        >
          Apply
        </Button>
      </Form>

      {couponData.couponValidation.isValid && (
        <h6 className="text-success mt-4">
          {couponData.couponValidation.message} <br />
          Discount Applied: {couponData.couponValidation.discountAmount}
          <br />
          Price after Discount: {couponData.couponValidation.priceAfterDiscount}
        </h6>
      )}

      <footer className="bg-light text-center text-lg-start bg-dark position-absolute container-fluid bottom-0 d-flex">
        {/* <div className="text-center p-3"> */}
        {couponData.allCoupons.map((coupon) => (
          <a
            key={coupon._id}
            className="text-white d-flex text-decoration-none mx-auto"
          >
            {" "}
            {coupon.couponCode}{" "}
          </a>
        ))}
        {/* </div> */}
      </footer>
    </div>
  );
};

export default Home;
