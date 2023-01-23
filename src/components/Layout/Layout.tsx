import React, { useContext, useState } from "react";
import BackToTop from "../elements/BackToTop";
import Footer from "./Footer";
import Header from "./Header";
import MobileMenu from "./MobileMenu";

interface Props {
  children: React.ReactNode;
  isLoading?: boolean;
}
const Layout = ({ children, isLoading = true }: Props) => {
  const [openClass, setOpenClass] = useState("");

  const handleOpen = () => {
    document.body.classList.add("mobile-menu-active");
    setOpenClass("sidebar-visible");
  };

  const handleRemove = () => {
    if (openClass === "sidebar-visible") {
      setOpenClass("");
    }
    document.body.classList.remove("mobile-menu-active");
  };

  return (
    <>
      <div className="body-overlay-1" onClick={handleRemove} />
      <Header
        handleOpen={handleOpen}
        handleRemove={handleRemove}
        openClass={openClass}
        isAuth={false}
      />
      <MobileMenu openClass={openClass} isAuth={false} />
      <main className="main">{children}</main>
      <Footer />
      <BackToTop />
    </>
  );
};

export default Layout;
