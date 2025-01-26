import userPhoto from "../assets/img/user.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
// import { useAuthState } from "react-firebase-hooks/auth";
// import auth from "../firebase/firebase.config";
import { useUser } from "../context/userContext";
import ProfileCard from "../components/Profile/ProfileCard";
import Swal from "sweetalert2";


const Profile = () => {
  const { userData } = useUser();
  // const [user] = useAuthState(auth);

  // State to hold posts
  const [foundPosts, setFoundPosts] = useState([]);
  const [missingPosts, setMissingPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      if (userData?.email) {
        const token = localStorage.getItem("token");
  
        // Fetch Found Posts
        const foundResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/found/found/email/${userData.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (foundResponse.data.data.length === 0) {
          console.log("No found posts available.");
        }
        setFoundPosts(foundResponse.data.data || []);
  
        // Fetch Missing Posts
        const missingResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/missing/missing/email/${userData.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (missingResponse.data.data.length === 0) {
          console.log("No missing posts available.");
        }
        setMissingPosts(missingResponse.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    }
  };
  

  useEffect(() => {
    fetchPosts();
  }, [ userData]);


  const handleDelete = async (postId, status) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
  
      if (result.isConfirmed) {
        // API Call for Deletion
        const endpoint =
          status === "Found"
            ? `${import.meta.env.VITE_API_URL}/api/found/found/delete/${postId}`
            : `${import.meta.env.VITE_API_URL}/api/missing/missing/delete/${postId}`;
  
        await axios.delete(endpoint, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        // Update state after deletion
        if (status === "Found") {
          setFoundPosts((prev) => prev.filter((post) => post._id !== postId));
        } else {
          setMissingPosts((prev) => prev.filter((post) => post._id !== postId));
        }
  
        // Show success alert
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error deleting post:", error.message);
      Swal.fire({
        title: "Error!",
        text: "There was an issue deleting your file.",
        icon: "error",
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-white py-10">
      <div className="container mx-auto px-4">
        {/* Profile Card */}
        <div className="card w-full lg:w-3/4 bg-white shadow-lg rounded-lg mx-auto p-8">
          <div className="flex flex-col md:flex-row  items-center">
            <div className="avatar">
              <div className="w-28 h-28 rounded-full ring ring-blue-500 ring-offset-4 ring-offset-white overflow-hidden">
                <img
                  src={userData?.userPhoto ? userData?.userPhoto : userPhoto}
                  alt="User"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="mt-6 md:mt-0 md:ml-8 text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-800">
                {userData?.name || "N/A"}
              </h2>
              <p className="text-gray-500 mt-2">
                <span className="font-semibold">Email:</span>{" "}
                {userData?.email || "N/A"}
              </p>
              <p className="text-gray-500 mt-2">
                <span className="font-semibold">Contact:</span>{" "}
                {userData?.phone || "N/A"}
              </p>
              <p className="text-gray-500 mt-2">
                <span className="font-semibold">Profile Complete:</span>{" "}
                {userData?.isProfileComplete ? "Yes" : "No"}
              </p>
              <p className="text-gray-500 mt-2">
                <span className="font-semibold">Verified:</span>{" "}
                {userData?.isVerified ? "Yes" : "No"}
              </p>
              <div className="mt-6">
                <h3 className="font-semibold text-lg text-gray-800">
                  Address Details:
                </h3>
                <p className="text-gray-500">
                  <span className="font-semibold">Division:</span>{" "}
                  {userData?.address?.division || "N/A"}
                </p>
                <p className="text-gray-500">
                  <span className="font-semibold">District:</span>{" "}
                  {userData?.address?.district || "N/A"}
                </p>
                <p className="text-gray-500">
                  <span className="font-semibold">Upazila:</span>{" "}
                  {userData?.address?.upazila || "N/A"}
                </p>
                <p className="text-gray-500">
                  <span className="font-semibold">Street:</span>{" "}
                  {userData?.address?.street || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Section */}
       
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            My Posts
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {foundPosts.length > 0 &&
              foundPosts.map((post) => (
                <ProfileCard
                  key={post._id}
                  data={post}
                  status="Found"
                  handleDelete={handleDelete}
                />
              ))}
            {missingPosts.length > 0 &&
              missingPosts.map((post) => (
                <ProfileCard
                  key={post._id}
                  data={post}
                  status="Missing"
                  handleDelete={handleDelete}
                />
              ))}
            {foundPosts.length === 0 && missingPosts.length === 0 && (
              <p className="text-center text-gray-500">No posts available.</p>
            )}
          </div>
          </div>
        </div>
      </div>

  );
};

export default Profile;
