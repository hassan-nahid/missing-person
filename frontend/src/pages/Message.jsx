import { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../context/userContext";
import toast from "react-hot-toast";

const Message = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userData } = useUser();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token"); // Retrieve token from localStorage

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/message/${userData?.email}`,
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
  }, [userData?.email]);

  if (loading) {
    return <div>Loading messages...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Messages</h1>
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
};

export default Message;
