import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import userImage from "../assets/user.jpg";
import Swal from "sweetalert2"; // Import SweetAlert2

const FoundPostManage = () => {
  const [search, setSearch] = useState("");
  const [foundData, setFoundData] = useState([]); // Store found data
  const [loading, setLoading] = useState(true); // To handle loading state
  const [filterFound, setFilterFound] = useState("all"); // Filter state: 'all' or 'found'

  // Fetch found data from API
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
        setFoundData(data?.data || []); // Set the found data
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFoundData();
  }, []);

  // Handle the search input change
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Handle filter change (All or Found)
  const handleFilterChange = (e) => {
    setFilterFound(e.target.value);
  };

  // Filter found data based on the search query and foundStatus
  const filteredData = foundData.filter((item) => {
    const matchesSearch = Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase());

    // Apply filter based on foundStatus
    if (filterFound === "found") {
      return matchesSearch && item.foundStatus;
    }

    return matchesSearch; // If filter is "all", show all items
  });

  // Handle the delete functionality
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/found/adminDelete/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to delete post");
        }

        // Remove the deleted post from the state
        setFoundData((prevData) => prevData.filter((item) => item._id !== id));
        Swal.fire("Deleted!", "The post has been deleted.", "success");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold blue-text">Found Post</h1>
          <p className="text-lg text-gray-600 mt-2">
            Browse and manage found persons data.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="flex justify-between mb-4 mx-10">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search by name, location, or other details..."
              className="input input-bordered"
            />
          </div>

          <div>
            <label className="mr-2">Filter by Status:</label>
            <select
              value={filterFound}
              onChange={handleFilterChange}
              className="select select-bordered"
            >
              <option value="all">All</option>
              <option value="found">Found</option>
            </select>
          </div>
        </div>

        {/* Found Data Table */}
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>FoundAt</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5">Loading...</td>
              </tr>
            ) : filteredData.length > 0 ? (
              filteredData.reverse().map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={item.photo || userImage}
                            alt="Profile"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{item.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{item.foundAt}</td>
                  <td>{item.foundStatus ? "Found" : "Not Found"}</td>
                  <td className="flex gap-2">
                    <Link to={`/admin_found_details/${item._id}`} className="btn btn-info text-white btn-xs">Details</Link>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-error text-white btn-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No results found</td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>FoundAt</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default FoundPostManage;
