// import "./App.css";
import { LanguageProvider } from "./LanguageContext";
import Navbar from "./Navbar";
// import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="app">
      <LanguageProvider>
        <header>
          {/* Component med children */}
          <Navbar></Navbar>
        </header>
        <Outlet />
        {/* component Footer added */}
        {/* <Footer /> */}
      </LanguageProvider>
    </div>
  );
}

export default Layout;
