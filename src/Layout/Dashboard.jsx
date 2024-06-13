import { Link, Outlet } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa";
import { FaUserPen } from "react-icons/fa6";
import { GrUserAdd } from "react-icons/gr";

const Dashboard = () => {
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Outlet />
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-indigo-600 text-white">
            {/* Sidebar content here */}
            <li>
              <Link to="/">
                <FaHome />
                Home
              </Link>
            </li>
            <li>
              <Link to="/dashboard/allEvent">
                <GrUserAdd />
                All Events
              </Link>
            </li>
            <li>
              <Link to="/dashboard/dashboardAddEvent">
                <FaUserGraduate />
                Add Event
              </Link>
            </li>

            <li>
              <Link to="/dashboard/profile">
                <FaUserPen />
                Profile
              </Link>
            </li>
            <li>
              <Link to="/dashboard/manageEvents">
                <GrUserAdd />
                Manage Events
              </Link>
            </li>

            <>
              <div className="divider divider-primary"></div>
            </>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
