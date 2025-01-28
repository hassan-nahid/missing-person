import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ManageUser = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState("");
    const token = localStorage.getItem("adminToken");

    // Fetch user data from the API
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
                    setUsers(data);
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

    // Filter users based on search query
    const filteredUsers = (Array.isArray(users) ? users : []).filter((user) => {
        const lowercasedQuery = searchQuery.toLowerCase();
        return (
            user.name?.toLowerCase().includes(lowercasedQuery) ||
            user.email?.toLowerCase().includes(lowercasedQuery) ||
            user.phone?.toLowerCase().includes(lowercasedQuery) ||
            user.address?.division?.toLowerCase().includes(lowercasedQuery) ||
            user.address?.district?.toLowerCase().includes(lowercasedQuery) ||
            user.address?.upazila?.toLowerCase().includes(lowercasedQuery) ||
            user.address?.street?.toLowerCase().includes(lowercasedQuery)
        );
    });

    // Delete user by ID with SweetAlert2 confirmation
    const deleteUser = (userId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/deleteUser/${userId}`, {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (response.ok) {
                        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
                        Swal.fire({
                            title: "Deleted!",
                            text: "The user has been deleted.",
                            icon: "success",
                        });
                    } else {
                        throw new Error("Failed to delete user");
                    }
                } catch (error) {
                    console.error("Error deleting user:", error);
                    Swal.fire({
                        title: "Error!",
                        text: "An error occurred while deleting the user.",
                        icon: "error",
                    });
                }
            }
        });
    };

    return (
        <div className="p-6">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold blue-text">Manage User</h1>
            </div>
            <div className="mb-4 flex justify-between items-center">
                <input
                    type="text"
                    placeholder="Search by name, email, phone, or location"
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
                            <th>Location</th>
                            <th>Verified</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.reverse().map((user, index) => (
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
                                            <div className="text-sm opacity-50">
                                                {user.address?.district || "Unknown"}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{user.email}</td>
                                <td>{user.phone || "Not provided"}</td>
                                <td>
                                    {user.address?.division}, {user.address?.district},{" "}
                                    {user.address?.upazila}
                                </td>
                                <td>
                                    <span
                                        className={`badge ${user.isVerified ? "badge-success" : "badge-warning"
                                            }`}
                                    >
                                        {user.isVerified ? "Verified" : "Not Verified"}
                                    </span>
                                </td>
                                <td className="flex justify-center items-center gap-2">
                                    <Link
                                        to={`/user_details/${user._id}`}
                                        className="btn btn-info text-white btn-xs transition-all"
                                    >
                                        Details
                                    </Link>
                                    <button
                                        onClick={() => deleteUser(user._id)}
                                        className="btn btn-error btn-xs text-white transition-all"
                                    >
                                        Delete
                                    </button>
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
                            <th>Location</th>
                            <th>Verified</th>
                            <th>Action</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default ManageUser;
