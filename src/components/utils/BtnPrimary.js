import React from "react";
import { twMerge } from "tailwind-merge";

const BtnPrimary = ({
  btnClass,
  children,
  type = "submit",
  btnFunction,
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={btnFunction}
      className={twMerge(
        "text-white text-sm md:text-base leading-4 md:leading-[26px] font-medium px-6 md:px-[44px] py-2 md:py-3 rounded  text-center",
        btnClass
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default BtnPrimary;
