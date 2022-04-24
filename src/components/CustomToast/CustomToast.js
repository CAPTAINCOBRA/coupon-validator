import React, { Fragment } from "react";
import "./CustomToast.scss";
import { FaCheckCircle } from "react-icons/fa";
import { ImWarning } from "react-icons/im";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { RiErrorWarningFill } from "react-icons/ri";

const CustomToast = (props) => {
  const { msg, err, info } = props;

  return (
    <Fragment>
      {/* <div>
        {err ? (
          <RiErrorWarningFill className="IconSize" />
        ) : info ? (
          <AiOutlineInfoCircle className="IconSize" />
        ) : (
          <FaCheckCircle className="IconSize" />
        )}
      </div> */}

      <div className="Text">{msg}</div>
    </Fragment>
  );
};

export default CustomToast;
