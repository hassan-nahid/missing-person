import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const VerifyUser = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState("");

    const token = localStorage.getItem("adminToken");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/users`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                if (Array.isArray(data)) {
                    setUsers(data.filter(user => user.isProfileComplete)); // Filter users with isProfileComplete: true
                } else {
                    throw new Error("Response is not an array");
                }
            } catch (error) {
                setError("Error fetching users");
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [token]);

    const handleVerify = async (userId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/verify/${userId}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                setUsers(users.map(user =>
                    user._id === userId ? { ...user, isVerified: true } : user
                ));
            } else {
                const errorData = await response.json();
                console.error("Error verifying user:", errorData.message);
            }
        } catch (error) {
            console.error("Error verifying user:", error);
        }
    };

    return (
        <div className="p-6">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold blue-text">Verify User</h1>
            </div>
            <div className="mb-4 flex justify-between items-center">
                <input
                    type="text"
                    placeholder="Search by name, email, phone"
                    className="input input-bordered w-full max-w-xs px-4 py-2"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Error Message */}
            {error && <div className="alert alert-error mb-4">{error}</div>}

            {/* Table with user data */}
            <div className="overflow-x-auto">
                <table className="table table-striped w-full text-sm">
                    {/* Table Header */}
                    <thead className="bg-gray-200 text-left">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Profile Completion</th>
                            <th>Verified Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users
                            .reverse().filter(user => {
                                const lowercasedQuery = searchQuery.toLowerCase();
                                return (
                                    user.name?.toLowerCase().includes(lowercasedQuery) ||
                                    user.email?.toLowerCase().includes(lowercasedQuery) ||
                                    user.phone?.toLowerCase().includes(lowercasedQuery)
                                );
                            })
                            .reverse()
                            .map((user, index) => (
                                <tr key={user._id} className="border-b hover:bg-gray-50">
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={user.userPhoto || "default-avatar.jpg"}
                                                        alt="Avatar"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-lg">{user.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{user.email}</td>
                                    <td>{user.phone || "Not provided"}</td>
                                    <td>
                                        <span className="badge badge-success">Complete</span>
                                    </td>
                                    <td>
                                        {user.isVerified ? (
                                            <span className="badge badge-success">Verified</span>
                                        ) : (
                                            <span className="badge badge-warning">Not Verified</span>
                                        )}
                                    </td>
                                    <td className="flex gap-2">
                                        <Link to={`/user_details/${user._id}`}
                                            className="btn btn-info text-white btn-xs">
                                            Details
                                        </Link>
                                        {!user.isVerified && (
                                            <button
                                                className="btn btn-accent text-white btn-xs"
                                                onClick={() => handleVerify(user._id)}
                                            >
                                                Verify
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                    </tbody>

                    {/* Table Footer */}
                    <tfoot>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Profile Completion</th>
                            <th>Verified Status</th>
                            <th>Actions</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default VerifyUser;
