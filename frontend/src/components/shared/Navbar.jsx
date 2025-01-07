import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import userPhoto from "../../assets/img/user.jpg";
import { HiBars3 } from "react-icons/hi2";


const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(0);

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

  const navlinks = (
    <>
      <li>
        <Link className="font-medium" to={"/"}>Home</Link>
      </li>
      <li>
        <Link className="font-medium" to={"/"}>Missing</Link>
      </li>
      <li>
        <Link className="font-medium" to={"/"}>About Us</Link>
      </li>
      <li>
        <Link className="font-medium" to={"/"}>Contact Us</Link>
      </li>
    </>
  );

  return (
    <div
      className={`fixed top-0 left-0 w-full transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="navbar bg-[#48A1EC]">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
             <HiBars3 className="text-2xl text-white"/>
              
            </div>
            <ul
              tabIndex={0}
              className="text-[#48A1EC] lg:text-[#fff] menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navlinks}
            </ul>
          </div>
          <a className="text-xl font-semibold text-[#fff]">ManusherKhoj</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-[#48A1EC] lg:text-[#fff]">{navlinks}</ul>
        </div>
        <div className="navbar-end">
          <img className="rounded-full w-10 h-10 mr-3" src={userPhoto} alt="" />
          <Link
            to={"/login"}
            className="btn btn-sm bg-white text-[#48A1EC] font-medium"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
