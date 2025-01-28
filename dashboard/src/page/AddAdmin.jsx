import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const AddAdmin = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleAddAdmin = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const token = localStorage.getItem("adminToken"); // Retrieve admin token

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/mf/admin/register`,
                {
                    name,
                    email,
                    password,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the request headers
                    },
                }
            );

            setSuccess(response.data.message || "Admin added successfully!");
            setName("");
            setEmail("");
            setPassword("");
            toast.success("Admin added successfully!");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add admin. Please try again.");
            toast.error(err.response?.data?.message || "Failed to add admin.");
        }
    };

    return (
        <div>
            <div className="hero bg-white min-h-screen ">
                <div className="hero-content flex-col lg:flex-row-reverse w-full">
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form className="card-body" onSubmit={handleAddAdmin}>
                            {error && <div className="text-red-500 mb-4">{error}</div>}
                            {success && <div className="text-green-500 mb-4">{success}</div>}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Admin Name</span>
                                </label>
                                <input
                                    type="name"
                                    placeholder="John Doe"
                                    className="input input-bordered"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Admin Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="newadmin@example.com"
                                    className="input input-bordered"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Enter a strong password"
                                    className="input input-bordered"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-control mt-6">
                                <button
                                    type="submit"
                                    className="btn blue-bg hover:blue-bg text-white"
                                >
                                    Add Admin
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddAdmin;
