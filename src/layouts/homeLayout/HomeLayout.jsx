import React from "react";
import LocalNavbar from "../../components/shared/LocalNavbar";
import Footer from "../../components/shared/Footer";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div>
      <header className="sticky top-0 z-50">
        <LocalNavbar></LocalNavbar>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default HomeLayout;
