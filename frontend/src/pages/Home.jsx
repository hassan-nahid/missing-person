import { useEffect, useState } from "react";
import Banner from "../components/home/Banner";
import Card from "../components/shared/Card";
import toast from "react-hot-toast";
import HomeTitle from "../components/shared/HomeTitle";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";


const Home = () => {
  const [missingData, setMissingData] = useState([]);
  const [foundData, setFoundData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Missing Data
  const fetchMissingData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/missing`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch missing data");
      const data = await response.json();
      setMissingData(data?.data || []);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fetch Found Data
  const fetchFoundData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/found`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch found data");
      const data = await response.json();
      setFoundData(data?.data || []);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchMissingData();
    fetchFoundData();
    setLoading(false);
  }, []);

  // Filtered high priority cases (age < 18 or serious illness/disabled in missing)
  const highDemandCases = [
    ...missingData.filter(
      (item) => item.age < 18 || item.seriousIllnessOrDisabled
    ),
    ...foundData.filter((item) => item.age < 18)
  ];

  // Limit to 3 cards initially for high demand
  const displayedHighDemandCases = highDemandCases && highDemandCases.slice(0, 3)

  // Get 3 most recent missing and found posts
  const recentMissing = missingData.slice(0, 3);
  const recentFound = foundData.slice(0, 3);

  return (
    <div>
      <Banner />
      {/* High Priority Cases */}

      {/* Recent Missing Cases */}
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <HomeTitle text="Recent Missing Cases" />
          <p className="text-lg text-gray-600 mt-2">
            These are the most recent missing person cases.
          </p>
          <div className="flex justify-end mt-5 mr-8">
            <Link to={"/missing"} className="btn btn-sm blue-bg hover:blue-bg text-white">Show More<FaLongArrowAltRight /></Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-3">
          {loading ? (
            <p>Loading...</p>
          ) : recentMissing.length > 0 ? (
            recentMissing.map((item) => (
              <Card key={item._id} data={item} status="Missing" />
            ))
          ) : (
            <p>No recent missing cases found</p>
          )}
        </div>
      </div>

      {/* Recent Found Cases */}
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <HomeTitle text="Recent Found Cases" />
          <p className="text-lg text-gray-600 mt-2">
            These are the most recent found person cases.
          </p>
          <div className="flex justify-end mt-5 mr-8">
            <Link to={"/found"} className="btn btn-sm blue-bg hover:blue-bg text-white">Show More<FaLongArrowAltRight /></Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-3">
          {loading ? (
            <p>Loading...</p>
          ) : recentFound.length > 0 ? (
            recentFound.map((item) => (
              <Card key={item._id} data={item} status="Found" />
            ))
          ) : (
            <p>No recent found cases found</p>
          )}
        </div>
      </div>
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <HomeTitle text="High Priority Cases" />
          <p className="text-lg text-gray-600 mt-2">
            These are the urgent cases that need immediate attention.
          </p>
          <div className="flex justify-end mt-5 mr-8">
            <Link to={"/missing"} className="btn btn-sm blue-bg hover:blue-bg text-white">Show More<FaLongArrowAltRight /></Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-3">
          {loading ? (
            <p>Loading...</p>
          ) : displayedHighDemandCases.length > 0 ? (
            displayedHighDemandCases.map((item) => (
              <Card key={item._id} data={item} status={item.age < 18 ? "Urgent" : "High Priority"} />
            ))
          ) : (
            <p>No urgent cases found</p>
          )}
        </div>


      </div>
    </div>
  );
};

export default Home;
