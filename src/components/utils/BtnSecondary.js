import React from "react";
import { twMerge } from "tailwind-merge";

const BtnSecondary = ({
    children,
    btnClass,
    btnFunction,
    type = "submit",
    ...props
}) => {
    return (
        <button
            type={type}
            onClick={btnFunction}
            className={twMerge(
                "text-special border border-special text-sm md:text-base leading-4 md:leading-[26px] font-medium px-3 py-[7px] md:px-[44px] md:py-[11px] rounded bg-white",
                btnClass
            )}
            {...props}
        >
            {children}
        </button>
    );
};

export default BtnSecondary;
