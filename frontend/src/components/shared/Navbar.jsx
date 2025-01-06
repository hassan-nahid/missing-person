import { Link } from "react-router-dom"
import userPhoto from "../../assets/img/user.jpg"

const Navbar = () => {

  const navlinks = [
    <>
      <li><Link className="font-medium after:text-" to={"/"}>Home</Link></li>
      <li><Link className="font-medium after:text-" to={"/"}>Missing</Link></li>
      <li><Link className="font-medium after:text-" to={"/"}>About Us</Link></li>
      <li><Link className="font-medium after:text-" to={"/"}>Contact Us</Link></li>
    </>
  ]

  return (
    <div>
      <div className="navbar bg-[#48A1EC] text-black lg:text-[#fff]">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              {navlinks}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl font-semibold text-[#fff]">ManusherKhoj</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navlinks}
          </ul>
        </div>
        <div className="navbar-end">
          <img className="rounded-full w-10 h-10 mr-3" src={userPhoto} alt="" />
          <a className="btn btn-sm bg-white text-[#48A1EC]  font-medium">Login</a>
        </div>
      </div>
    </div>
  )
}

export default Navbar