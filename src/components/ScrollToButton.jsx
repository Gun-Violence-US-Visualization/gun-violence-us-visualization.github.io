// ScrollToButton.jsx

import React from "react";

import { scrollTo } from "../utils";

const ScrollToButton = ({ toId, toRef, duration, children }) => {
  const handleClick = () => scrollTo({ id: toId, ref: toRef, duration });

  return <button onClick={handleClick}>{children}</button>;
};

export default ScrollToButton;
