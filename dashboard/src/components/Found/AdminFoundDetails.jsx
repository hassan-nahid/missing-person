import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import noPhoto from '../../assets/no_photo.png'; // Placeholder image

const AdminFoundDetails = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const [postDetails, setPostDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFoundPostDetails = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/found/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch found post details');
        }

        const data = await response.json();
        setPostDetails(data?.data);
      } catch (error) {
        setError(error.message);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFoundPostDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  // Destructure the post details
  const { post, user } = postDetails || {};
  if (!post || !user) return <p>No data found</p>;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Full Width Image Section */}
        <div className="relative w-full md:w-[75%] lg:w-[60%] mx-auto">
          <img
            src={post.photo || noPhoto} // Default image if no photo available
            alt="Found Person"
            className="w-full h-full object-cover rounded-t-lg shadow-lg"
          />
        </div>

        {/* Post and User Information Section */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Found Person Details</h2>

          {/* Found Post Details */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Post Information</h3>
            <div className="text-gray-600 space-y-2">
              <p><span className="font-semibold">Name:</span> {post.name}</p>
              <p><span className="font-semibold">Age:</span> {post.age}</p>
              <p><span className="font-semibold">Gender:</span> {post.gender}</p>
              <p><span className="font-semibold">Found At:</span> {post.foundAt}</p>
              <p><span className="font-semibold">Clothes:</span> {post.clothes || "Not available"}</p>
              <p><span className="font-semibold">Skin Color:</span> {post.skinColor || "Not available"}</p>
              <p><span className="font-semibold">Height:</span> {post.height || "Not available"}</p>
              <p><span className="font-semibold">Description:</span> {post.description}</p>
              <p><span className="font-semibold">Case Status:</span> {post.caseStatus}</p>
              <p><span className="font-semibold">Found Status:</span> {post.foundStatus ? "Yes" : "No"}</p>
              <p><span className="font-semibold">Additional Details:</span> {post.additionalDetails || "Not available"}</p>
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

          {/* Handover Details */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Handover Details</h3>
            {post.handoverDetails ? (
              <div className="text-gray-600 space-y-2">
                <p><span className="font-semibold">Relative Name:</span> {post.handoverDetails.relativeName}</p>
                <p><span className="font-semibold">Relationship:</span> {post.handoverDetails.relationship}</p>
                <p><span className="font-semibold">Contact Info:</span> {post.handoverDetails.contactInfo}</p>
                <p><span className="font-semibold">Handover Date:</span> {new Date(post.handoverDetails.handoverDate).toLocaleDateString()}</p>
                <p><span className="font-semibold">Remarks:</span> {post.handoverDetails.remarks || "No remarks"}</p>
              </div>
            ) : (
              <p>No handover details available.</p>
            )}
          </div>

          {/* Optional Action Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row justify-between gap-4">
            <button
              onClick={() => alert('Action for Admin')} // Example admin action
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

export default AdminFoundDetails;
