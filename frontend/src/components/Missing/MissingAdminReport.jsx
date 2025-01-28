import { useState } from "react";
import { useUser } from "../../context/userContext";
import toast from "react-hot-toast";
import Title from "../shared/Title";
import { useParams } from "react-router-dom";

const MissingAdminReport = () => {
  const { userData } = useUser();
  const {id} = useParams();
  const [formData, setFormData] = useState({
    from: userData?.email || "",
    to: "Admin",
    name: userData?.name || "",
    phone: userData?.phone || "",
    details: "",
    postId: id || "",
    postType: "missing",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Message sent successfully");
        setFormData({
          ...formData,
          details: "",
          postId: "",
        });
      } else {
        console.error("Failed to send message:", await response.text());
        toast.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("An error occurred");
    }
  };

  return (
    <div className="p-4 my-10">
      <Title className="py-10" text={"Admin Report"}/>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="from" className="block font-medium">
            From
          </label>
          <input
            type="email"
            id="from"
            name="from"
            value={formData.from}
            onChange={handleChange}
            className="input input-bordered w-full"
            disabled
            required
          />
        </div>
        <div>
          <label htmlFor="to" className="block font-medium">
            To
          </label>
          <input
            type="email"
            id="to"
            name="to"
            value={formData.to}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
            disabled
          />
        </div>
        <div>
          <label htmlFor="name" className="block font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            disabled
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block font-medium">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="input input-bordered w-full"
            disabled
            required
          />
        </div>
        <div>
          <label htmlFor="details" className="block font-medium">
            Details
          </label>
          <textarea
            id="details"
            name="details"
            value={formData.details}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            rows="4"
            required
          ></textarea>
        </div>

        <button className="btn blue-bg hover:blue-bg text-white" type="submit">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default MissingAdminReport;
