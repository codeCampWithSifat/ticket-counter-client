import { Link } from "react-router-dom";

const Navbar = () => {
  const menuItems = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/review">Client Review</Link>
      </li>
      <li>
        <Link to="/qna">Frequently Ask Qus</Link>
      </li>
      <li>
        <Link to="/dashboard/dashboardHome">Dashboard</Link>
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar bg-slate-900 p-3 shadow-lg text-white fixed z-40">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu text-indigo-800 menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menuItems}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl lg:mx-20">
            <h3>Sifat_Ticket_Counter</h3>
          </Link>
        </div>
        <div className="navbar-end hidden lg:flex mr-20">
          <ul className="menu menu-horizontal px-1">{menuItems}</ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
