import { useState } from "react";
import { Link } from "react-router-dom";

const Missing = () => {
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600">Missing Persons</h1>
          <Link className="btn" to={"/missing_post"}>Missing Post</Link>
          <p className="text-lg text-gray-600 mt-2">
            Browse the list of missing persons or search for specific individuals.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-white shadow rounded-lg p-4 mb-8">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search by name, location, or other details..."
            className="input input-bordered w-full md:w-2/3 mb-4 md:mb-0"
          />
          <button className="btn btn-primary w-full md:w-auto">Search</button>
        </div>

        {/* Missing Persons List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Dynamic posts should be mapped here */}
          {/* Example structure for a single post */}
          {/* Replace this block with dynamic data */}
          <div className="card bg-white shadow-lg rounded-lg overflow-hidden">
            <figure>
              <img
                src="https://via.placeholder.com/400x250.png?text=Missing+Person"
                alt="Missing Person"
                className="w-full h-48 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-xl font-bold">Name</h2>
              <p className="text-gray-600">Description goes here...</p>
              <div className="mt-4">
                <button className="btn btn-sm btn-info">Details</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Missing;
