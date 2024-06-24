// import "./App.css";
import Navbar from "./Navbar";
// import Footer from "./Footer";
import { Outlet } from "react-router-dom";

//This is the layout-page used for creating other pages. It contains Navbar and Footer.

function Layout() {
  return (
    <div className="app">
      <header>
        {/* Component med children */}
        <Navbar></Navbar>
      </header>
      <Outlet />
      {/* component Footer added */}
      {/* <Footer /> */}
    </div>
  );
}

export default Layout;
