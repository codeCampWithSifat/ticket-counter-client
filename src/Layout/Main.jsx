import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";

const Main = () => {
  return (
    <div className="bg-slate-900">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
