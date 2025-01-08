import bannerImg from "../../assets/img/banner1.png";
import logo_r from "../../assets/img/logo-r.png";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="relative mt-16">
      <img className="w-full h-[100%] md:h-[100%] lg:h-screen" src={bannerImg} alt="Banner" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
        <img src={logo_r} alt="Logo" className="mb-4 w-10 md:w-20 lg:w-40" />
        <h1 className="text-xl md:text-2xl lg:text-4xl font-bold">Help Us Bring Them Home</h1>
        <h1 className="text-base md:text-xl lg:text-2xl mt-2">Report Missing or Found Persons Today!</h1>
        <div className="flex gap-4 mt-2">
          <Link to={"/missing"} className="btn btn-xs lg:btn lg:blue-bg blue-bg text-white border-0 hover:blue-bg lg:text-white lg:border-0 lg:hover:blue-bg">Missing</Link>
          <Link to={"/found"} className="btn btn-xs lg:btn lg:blue-bg blue-bg text-white border-0 hover:blue-bg lg:text-white lg:border-0 lg:hover:blue-bg">Found</Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;