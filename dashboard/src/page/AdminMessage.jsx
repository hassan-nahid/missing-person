import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const AdminMessage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const Admin = "Admin";
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("adminToken"); // Retrieve token from localStorage

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/message/${Admin}`
          ,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in headers
            },
          }
        );

        setMessages(response.data.data);
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) {
    return <div>Loading messages...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold blue-text">Message</h1>
      </div>
      {messages.length === 0 ? (
        <p className="h-screen">No messages found.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message._id}
              className="border p-4 rounded shadow-md bg-white"
            >
              <h2 className="text-lg font-semibold">
                {message.postType === "missing" ? "Missing" : "Found"} Person: {message.missingPersonName || "Unknown"}
              </h2>
              <p>
                <strong>From:</strong> {message.from}
              </p>
              <p>
                <strong>To:</strong> {message.to}
              </p>
              <p>
                <strong>Name:</strong> {message.name}
              </p>
              <p>
                <strong>Phone:</strong> {message.phone}
              </p>
              <p>
                <strong>Details:</strong> {message.details}
              </p>
              <p className="text-gray-500 text-sm">
                <strong>Sent At:</strong>{" "}
                {new Date(message.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminMessage