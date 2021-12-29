// Section.jsx

import React from "react";

const ScrollToButton = React.forwardRef(({ id, title, children }, ref) => (
  <section ref={ref} id={id}>
    <h2>{title}</h2>
    {children}
  </section>
));

export default ScrollToButton;
