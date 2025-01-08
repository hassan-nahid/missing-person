import Banner from "../components/home/Banner";

const Home = () => {
  return (
    <div className="max-w-[1440px] mx-auto">
      <Banner />
      <button className="btn bg-[#0AC26D] hover:bg-[#0AC26D] text-[#fff]">
        I am hacker
      </button>
      <button className="btn blue-bg hover:blue-bg text-[#fff]">
        I am hacker
      </button>
    </div>
  );
};

export default Home;
