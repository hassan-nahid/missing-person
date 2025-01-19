import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../components/shared/Title";
import { FiEdit3 } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import Card from "../components/shared/Card";
import toast from "react-hot-toast";

const Missing = () => {
  const [search, setSearch] = useState("");
  const [missingData, setMissingData] = useState([]); // Ensure it's initialized as an array
  const [loading, setLoading] = useState(true);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const fetchMissingData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/missing`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch missing data");
        }

        const data = await response.json();
        console.log("Fetched Missing Data:", data); // Debug: Check structure of the fetched data

        // Ensure data contains an array of missing persons
        setMissingData(data?.data || []);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMissingData();
  }, []);

  // Filter the missing data based on the search input
  const filteredData = Array.isArray(missingData)
    ? missingData.filter((item) => {
        console.log("Item Structure:", item); // Debug: Log each item structure
        const values = Object.values(item);
        console.log("Values in Filter:", values); // Debug: Log the values for filtering
        return values.join(" ").toLowerCase().includes(search.toLowerCase()); // Filter by all values
      })
    : [];

  console.log("Filtered Data:", filteredData); // Debug: Log filtered data to verify

  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <Title text={"Missing"} />
          <p className="text-lg text-gray-600 mt-2">
            Browse the list of missing persons or search for specific individuals.
          </p>
          <div className="flex justify-end mr-4">
            <Link className="btn blue-bg hover:blue-bg text-white" to={"/missing_post"}>
              <FiEdit3 /> Missing Post
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

        {/* Missing Persons List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-3">
          {loading ? (
            <p>Loading...</p>
          ) : filteredData.length > 0 ? (
            filteredData.map((item) => (
              <Card key={item._id} data={item} />
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Missing;
