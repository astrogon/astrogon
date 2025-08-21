import React, { useState } from "react";

const Accordion = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className="mb-6 overflow-hidden rounded-lg border border-border dark:border-darkmode-border">
      <button
        className="glass-t-borderless flex w-full cursor-pointer items-center justify-between px-4 py-2 text-lg text-txt-p dark:text-darkmode-txt-p"
        onClick={() => setShow(!show)}
      >
        {title}
        <svg
          className={`ml-auto h-[.8em] w-[.8em] transition-transform duration-200 ${show ? "rotate-0" : "rotate-[-90deg]"}`}
          x="0px"
          y="0px"
          viewBox="0 0 512 512"
          xmlSpace="preserve"
        >
          <path
            fill="currentColor"
            d="M505.755,123.592c-8.341-8.341-21.824-8.341-30.165,0L256.005,343.176L36.421,123.592c-8.341-8.341-21.824-8.341-30.165,0 s-8.341,21.824,0,30.165l234.667,234.667c4.16,4.16,9.621,6.251,15.083,6.251c5.462,0,10.923-2.091,15.083-6.251l234.667-234.667 C514.096,145.416,514.096,131.933,505.755,123.592z"
          ></path>
        </svg>
      </button>
      <div
        className={`max-h-0 overflow-hidden px-4 py-0 ${show && "max-h-full py-0"}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
