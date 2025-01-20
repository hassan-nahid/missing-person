import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../components/shared/Title";
import { FiEdit3 } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import Card from "../components/shared/Card";
import toast from "react-hot-toast";

const Found = () => {
  const [search, setSearch] = useState("");
  const [foundData, setFoundData] = useState([]); // Ensure it's initialized as an array
  const [loading, setLoading] = useState(true);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const fetchFoundData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/found`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch found data");
        }

        const data = await response.json();

        // Ensure data contains an array of found persons
        setFoundData(data?.data || []);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFoundData();
  }, []);

  // Filter the found data based on the search input and foundStatus
  const filteredData = Array.isArray(foundData)
    ? foundData.filter((item) => {
        // Filter by all values and exclude those with foundStatus true
        const values = Object.values(item);
        return values.join(" ").toLowerCase().includes(search.toLowerCase()) && !item.foundStatus;
      })
    : [];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <Title text={"Found"} />
          <p className="text-lg text-gray-600 mt-2">
            Browse the list of found persons or search for specific individuals.
          </p>
          <div className="flex justify-end mr-4">
            <Link className="btn blue-bg hover:blue-bg text-white" to={"/found_post"}>
              <FiEdit3 /> Found Post
            </Link>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-gray-50 shadow rounded-lg p-4 mb-8 mx-6">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search by name, location, or other details..."
            className="input input-bordered w-full md:w-2/3 mb-4 md:mb-0"
          />
          <button className="btn blue-bg hover:blue-bg text-white w-full md:w-auto">
            <FaSearch /> Search
          </button>
        </div>

        {/* Found Persons List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-3">
          {loading ? (
            <p>Loading...</p>
          ) : filteredData.length > 0 ? (
            filteredData.map((item) => (
              <Card key={item._id} data={item} status={"Found"} />
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Found;
