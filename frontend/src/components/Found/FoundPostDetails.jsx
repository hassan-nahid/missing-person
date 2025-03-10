import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import FoundModal from "./FoundModal";
import { useUser } from "../../context/userContext";
import noPhoto from "../../assets/img/no_photo.png";

const FoundPostDetails = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const navigate = useNavigate(); // For navigation
  const [postDetails, setPostDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userData } = useUser();

  useEffect(() => {
    const fetchFoundPostDetails = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/found/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch found post details");
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

    fetchFoundPostDetails();
  }, [id]);

  const handleContactOwner = () => {
    if (userData?.isProfileComplete) {
      document.getElementById("my_modal_5").showModal();
    } else {
      toast.error("Please complete your profile to contact the owner.");
      navigate("/complete_profile");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  // Destructure post and user details
  const { post, user } = postDetails || {};
  if (!post || !user) return <p>No data found</p>;

  const btnDisabled = user.email === userData.email ? true : false;


  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Full Width Image Section */}
        <div className="relative w-full md:w-[75%] lg:w-[60%] mx-auto">
          <img
            src={post.photo || noPhoto} // Default image if no photo available
            alt="Found Person"
            className="w-full h-full object-cover rounded-t-lg shadow-lg" // Full width, height, and shadow for a cool effect
          />
        </div>

        {/* Post and User Information Section */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Found Person Details</h2>

          {/* Found Post Details */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Post Information</h3>
            <div className="text-gray-600 space-y-2">
              <p>
                <span className="font-semibold">Name:</span> {post.name || "Not available"}
              </p>
              <p>
                <span className="font-semibold">Age:</span> {post.age || "Not available"}
              </p>
              <p>
                <span className="font-semibold">Found At:</span> {post.foundAt || "Not available"}
              </p>
              <p>
                <span className="font-semibold">Clothes:</span> {post.clothes || "Not available"}
              </p>
              <p>
                <span className="font-semibold">Skin Color:</span> {post.skinColor || "Not available"}
              </p>
              <p>
                <span className="font-semibold">Height:</span> {post.height || "Not available"}
              </p>
              <p>
                <span className="font-semibold">Date:</span> {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold">Description:</span> {post.description || "Not available"}
              </p>
            </div>
          </div>

          {/* User Contact Details */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Contact Information</h3>
            <div className="text-gray-600 space-y-2">
              <p>
                <span className="font-semibold">Name:</span> {user.name}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {user.email}
              </p>
              <p>
                <span className="font-semibold">Phone:</span> {user.phone || "Not available"}
              </p>
              <p>
                <span className="font-semibold">Address:</span> {user.address?.street || "Not available"}, {user.address?.upazila || "Not available"}, {user.address?.district || "Not available"}
              </p>
              <p>
                <span className="font-semibold">Verified:</span> {user.isVerified ? "Yes" : "No"}
              </p>
            </div>
          </div>

          {/* Optional Action Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row justify-between gap-4">
            <button
              disabled={btnDisabled}
              onClick={handleContactOwner}
              className="btn blue-bg text-white px-6 py-2 rounded-lg hover:blue-bg transition duration-300 w-full sm:w-auto"
            >
              Contact Owner
            </button>
            <Link 
              to={`/found_admin_report/${post._id}`}
              disabled={btnDisabled}
              className="btn bg-red-400 text-white px-6 py-2 rounded-lg hover:bg-red-400 transition duration-300 w-full sm:w-auto">
              Report Issue
            </Link>
          </div>
          <FoundModal postDetails={postDetails} />
        </div>
      </div>
    </div>
  );
};

export default FoundPostDetails;
