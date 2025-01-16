import userPhoto from '../assets/img/user.jpg';
import postPhoto from '../assets/img/userPhoto.jpg';
import { useUser } from '../context/userContext';

const Profile = () => {

  const {userData} = useUser();
  console.log(userData)

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        {/* Profile Card */}
        <div className="card w-full lg:w-2/3 bg-white shadow-lg rounded-lg mx-auto p-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-blue-bg ring-offset-base-100 ring-offset-2">
                <img src={userData?.userPhoto ? userData?.userPhoto : userPhoto} alt="user photo" />
              </div>
            </div>
            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
              <h2 className="text-2xl font-semibold text-gray-800">{userData?.name}</h2>
              <p className="text-gray-500">Email: {userData?.email}</p>
              <p className="text-gray-500">Contact: {userData?.phone}</p>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="mt-10">
          <h3 className="text-xl font-bold text-gray-800 mb-6">My Posts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Example Post Card */}
            <div className="card bg-white shadow-md rounded-lg p-4">
              <img
                src={postPhoto}
                alt="Post"
                className="w-full h-40 object-cover rounded-lg"
              />
              <div className="mt-4">
                <h4 className="text-lg font-semibold text-gray-700">
                  Missing: Jane Doe
                </h4>
                <p className="text-sm text-gray-500">
                  Last seen: Dhaka, Bangladesh
                </p>
                <p className="text-sm text-gray-500">Date: 2025-01-01</p>
                <button className="btn btn-sm blue-bg hover:blue-bg text-white mt-4">
                  View Details
                </button>
              </div>
            </div>

            {/* Example Found Post Card */}
            <div className="card bg-white shadow-md rounded-lg p-4">
              <img
                src={postPhoto}
                alt="Post"
                className="w-full h-40 object-cover rounded-lg"
              />
              <div className="mt-4">
                <h4 className="text-lg font-semibold text-gray-700">
                  Found: Unknown Male
                </h4>
                <p className="text-sm text-gray-500">
                  Found in: Sylhet, Bangladesh
                </p>
                <p className="text-sm text-gray-500">Date: 2025-01-03</p>
                <button className="btn btn-sm blue-bg hover:blue-bg text-white mt-4">
                  View Details
                </button>
              </div>
            </div>

            {/* Add more cards as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
