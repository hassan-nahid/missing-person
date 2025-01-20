import userPhoto from "../assets/img/user.jpg";
import { useUser } from "../context/userContext";
// import Card from "../components/shared/Card";

const Profile = () => {
  const { userData } = useUser();


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
              {/* <Card/> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
