import React from "react";
import LocalNavbar from "../../components/shared/LocalNavbar";
import Footer from "../../components/shared/Footer";

const HomeLayout = () => {
  return (
    <div>
      <header>
        <LocalNavbar></LocalNavbar>
      </header>
      <main></main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default HomeLayout;
