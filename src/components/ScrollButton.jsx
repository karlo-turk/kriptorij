import React, { useState } from "react";
import { Button } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);
  return (
    <>
      <Button
        type="primary"
        shape="circle"
        icon={<ArrowUpOutlined />}
        size="large"
        className="up-button"
        onClick={scrollToTop}
        style={{ display: visible ? "inline" : "none" }}
      />
    </>
  );
};

export default ScrollButton;
