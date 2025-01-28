import { Link, Outlet, useNavigate } from "react-router-dom"
import { FaHome } from "react-icons/fa";
import { FaUserCog } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa6";
import { GiStabbedNote } from "react-icons/gi";
import { GiNotebook } from "react-icons/gi";
import { MdMessage } from "react-icons/md";
import { MdAdminPanelSettings } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { LuPanelLeftOpen } from "react-icons/lu";

import userPhoto from "../assets/user.jpg"





const DashboardLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        navigate("/login");
    
    }

    return (
        <div><div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                <label htmlFor="my-drawer-2" className="btn my-2 blue-bg hover:blue-bg text-white drawer-button lg:hidden">
                  <LuPanelLeftOpen/>  Open Menu
                </label>
                <div className="w-full h-full">
                    <Outlet />
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 flex flex-col justify-between p-4">
                    <div>
                        <Link to={"/"} className="blue-text text-2xl font-bold">ManusherKhoj</Link>
                        {/* Sidebar content here */}
                        <li><Link to={"/"}><FaHome/>Home</Link></li>
                        <li><Link to={"/manage_user"}><FaUserCog/>Manage User</Link></li>
                        <li><Link to={"/verify_user"}><FaUserCheck/>Verify User</Link></li>
                        <li><Link to={"/missing_post_manage"}><GiStabbedNote/>Missing Post Manage</Link></li>
                        <li><Link to={"/found_post_manage"}><GiNotebook/>Found Post Manage</Link></li>
                        <li><Link to={"/admin_message"}><MdMessage/>Message</Link></li>
                        <li><Link to={"/add_admin"}><MdAdminPanelSettings/>Add Admin</Link></li>
                    </div>
                    <div className="flex justify-center gap-2 items-center">
                        <button onClick={handleLogout} className="btn btn-error text-white w-[70%]"><MdLogout/>Logout</button>
                        <div>
                            <img src={userPhoto} className="w-12 rounded-full border-2 border-blue-400" alt="" />
                        </div>
                    </div>
                </ul>
            </div>
        </div></div>
    )
}

export default DashboardLayout