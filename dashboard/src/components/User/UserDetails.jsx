import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import userImage from "../../assets/user.jpg"

const UserDetails = () => {
    const { id } = useParams(); // Getting the userId from URL parameters
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    // Fetch user data based on userId
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/user/singleDetails/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("User not found");
                }

                const data = await response.json();
                setUser(data); // Assuming the API returns a single user object
            } catch (error) {
                setError(error.message);
                console.error("Error fetching user details:", error);
            }
        };

        fetchUser();
    }, [id]);

    if (error) {
        return (
            <div className="alert alert-error text-center p-4">
                {error}
            </div>
        );
    }

    if (!user) {
        return <div className="text-center mt-10">Loading user details...</div>;
    }

    return (
        <div className="p-6">
            {/* Main Container */}
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
                {/* User Info */}
                <div className="flex items-center gap-6 border-b pb-6">
                    <div className="avatar">
                        <div className="mask mask-squircle h-32 w-32">
                            <img
                                src={user.userPhoto || userImage}
                                alt="User Avatar"
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold">{user.name}</h2>
                        <p className="text-gray-600 text-lg">{user.email}</p>
                        <p className="text-gray-500">{user.phone || "Phone not provided"}</p>
                    </div>
                </div>

                {/* Address */}
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-4">Address</h3>
                    <div className="grid grid-cols-2 gap-4 text-gray-700">
                        <div>
                            <p><strong>Division:</strong> {user.address?.division || "Unknown"}</p>
                            <p><strong>District:</strong> {user.address?.district || "Unknown"}</p>
                        </div>
                        <div>
                            <p><strong>Upazila:</strong> {user.address?.upazila || "Unknown"}</p>
                            <p><strong>Street:</strong> {user.address?.street || "Unknown"}</p>
                        </div>
                    </div>
                </div>

                {/* Identification */}
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-4">Identification</h3>
                    <div className="grid grid-cols-2 gap-4 text-gray-700">
                        <div>
                            <p><strong>Type:</strong> {user.identificationType || "Not provided"}</p>
                        </div>
                        <div>
                            <p><strong>Number:</strong> {user.identificationNumber || "Not provided"}</p>
                        </div>
                    </div>
                </div>

                {/* Document Photo */}
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-4">Document Photo</h3>
                    <div className="flex justify-center">
                        <img
                            src={user.documentPhoto || "/no-document.jpg"}
                            alt="Document"
                            className="max-w-full h-auto rounded-lg shadow-md"
                        />
                    </div>
                    {!user.documentPhoto && (
                        <p className="text-center text-gray-500 mt-2">
                            No document photo available
                        </p>
                    )}
                </div>

                {/* Profile Completion */}
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-4">Profile Completion</h3>
                    <div
                        className={`badge px-4 py-2 ${
                            user.isProfileComplete ? "badge-success" : "badge-warning"
                        }`}
                    >
                        {user.isProfileComplete ? "Complete" : "Incomplete"}
                    </div>
                </div>

                {/* Verification Status */}
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-4">Verification Status</h3>
                    <div
                        className={`badge px-4 py-2 ${
                            user.isVerified ? "badge-success" : "badge-warning"
                        }`}
                    >
                        {user.isVerified ? "Verified" : "Not Verified"}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
