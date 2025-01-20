import { Outlet } from "react-router-dom"
import Navbar from "../components/shared/Navbar"
import Footer from "../components/shared/Footer"

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-[1440px] mx-auto mt-16">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout