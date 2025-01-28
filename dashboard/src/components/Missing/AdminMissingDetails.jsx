import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import noPhoto from "../../assets/no_photo.png";

const AdminMissingDetails = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const [postDetails, setPostDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMissingPostDetails = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/missing/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch missing post details");
        }

        const data = await response.json();
        setPostDetails(data?.data); // Assuming data contains both post and user information
      } catch (error) {
        setError(error.message);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMissingPostDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  // Destructure post and user details
  const { post, user } = postDetails || {};
  if (!post || !user) return <p>No data found</p>;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Full Width Image Section */}
        <div className="relative w-full md:w-[75%] lg:w-[60%] mx-auto">
          <img
            src={post.photo || noPhoto} // Default image if no photo available
            alt="Missing Person"
            className="w-full h-full object-cover rounded-t-lg shadow-lg" // Full width, height, and shadow for a cool effect
          />
        </div>

        {/* Post and User Information Section */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Missing Person Details</h2>

          {/* Missing Post Details */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Post Information</h3>
            <div className="text-gray-600 space-y-2">
              <p><span className="font-semibold">Name:</span> {post.name}</p>
              <p><span className="font-semibold">Age:</span> {post.age}</p>
              <p><span className="font-semibold">Gender:</span> {post.gender}</p>
              <p><span className="font-semibold">Care Of:</span> {post.careOf}</p>
              <p><span className="font-semibold">Last Seen:</span> {post.lastSeen}</p>
              <p><span className="font-semibold">Clothes:</span> {post.clothes}</p>
              <p><span className="font-semibold">Skin Color:</span> {post.skinColor}</p>
              <p><span className="font-semibold">Height:</span> {post.height}</p>
              <p><span className="font-semibold">Education:</span> {post.education || "Not available"}</p>
              <p><span className="font-semibold">Serious Illness or Disabled:</span> {post.seriousIllnessOrDisabled || "Not available"}</p>
              <p><span className="font-semibold">Description:</span> {post.description || "Not available"}</p>
              <p><span className="font-semibold">Case Status:</span> {post.caseStatus}</p>
              <p><span className="font-semibold">Found Status:</span> {post.foundStatus ? "Yes" : "No"}</p>
              <p><span className="font-semibold">Case Type:</span> {post.caseType || "Not available"}</p>
              <p><span className="font-semibold">Other Case Type:</span> {post.otherCaseType || "Not available"}</p>
              <p><span className="font-semibold">Created At:</span> {new Date(post.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          {/* User Contact Details */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Contact Information</h3>
            <div className="text-gray-600 space-y-2">
              <p><span className="font-semibold">Name:</span> {user.name}</p>
              <p><span className="font-semibold">Email:</span> {user.email}</p>
              <p><span className="font-semibold">Phone:</span> {user.phone || "Not available"}</p>
              <p><span className="font-semibold">Address:</span> {user.address?.street || "Not available"}, {user.address?.upazila || "Not available"}, {user.address?.district || "Not available"}</p>
              <p><span className="font-semibold">Verified:</span> {user.isVerified ? "Yes" : "No"}</p>
            </div>
          </div>

          {/* Optional Action Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row justify-between gap-4">
            <button
              onClick={() => alert("Admin Action")}
              className="btn blue-bg text-white px-6 py-2 rounded-lg hover:blue-bg transition duration-300 w-full sm:w-auto"
            >
              Admin Action
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMissingDetails;
