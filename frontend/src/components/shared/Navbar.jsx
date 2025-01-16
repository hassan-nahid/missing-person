import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { HiBars3 } from "react-icons/hi2";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase/firebase.config";
import userPhoto from "../../assets/img/user.jpg";
import toast from "react-hot-toast";
import { IoIosLogOut } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { useUser } from "../../context/userContext";


const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [user] = useAuthState(auth);

  const {userData} = useUser();


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > prevScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollY]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("User logged out");
      })
      .catch((error) => {
        toast.error("Error logging out:", error);
      });
    localStorage.removeItem("token");
  };

  const navlinks = (
    <>
      <li>
        <Link className="font-medium" to={"/"}>Home</Link>
      </li>
      <li>
        <Link className="font-medium" to={"/missing"}>Missing</Link>
      </li>
      <li>
        <Link className="font-medium" to={"/found"}>Found</Link>
      </li>
      <li>
        <Link className="font-medium" to={"/about_us"}>About Us</Link>
      </li>
      <li>
        <Link className="font-medium" to={"/about_us"}>Contact Us</Link>
      </li>
    </>
  );

  return (
    <div
      className={`fixed top-0 z-50 left-0 w-full transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="navbar blue-bg px-2 md:px-5 lg:px-10">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <HiBars3 className="text-2xl text-white" />
            </div>
            <ul
              tabIndex={0}
              className="blue-text lg:text-[#fff] menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navlinks}
            </ul>
          </div>
          <Link to={"/"} className="text-xl font-semibold cursor-pointer text-[#fff]">ManusherKhoj</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 blue-text lg:text-[#fff]">
            {navlinks}
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar"
                role="button"
              >
                <div className="w-10 rounded-full">
                  <img
                    src={userPhoto}
                    alt="User"
                    title={user?.displayName}
                    className="rounded-full"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/profile" className="font-medium">
                    <FaUser/> Profile
                  </Link>
                </li>
                {userData?.isProfileComplete ? (
                  <>
                    {/* <Link to="/edit_profile" className="font-medium">
                      <FaUserEdit/> Edit Profile
                    </Link> */}
                  </>
                ) : (
                  <li>
                    <Link to="/complete_profile" className="font-medium">
                      <FaUserEdit/> Complete Profile
                    </Link>
                  </li>
                )}
                <hr />
                <li>
                  <button onClick={handleLogout} className="font-medium text-red-500">
                   <IoIosLogOut/> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to={"/login"}
              className="btn btn-sm bg-white blue-text font-medium"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
