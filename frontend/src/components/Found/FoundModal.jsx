import toast from "react-hot-toast";
import { useUser } from "../../context/userContext";
import { useState } from "react";

const FoundModal = ({ postDetails }) => {
  const { userData } = useUser();

  const [formData, setFormData] = useState({
    from: userData?.email || "",
    to: postDetails?.user?.email || "",
    name: userData?.name || "",
    phone: userData?.phone || "",
    details: "",
    postId: postDetails?.post?._id || "",
    postType: "found",
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
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Message sent successfully");
        document.getElementById("my_modal_5").close();
      } else {
        console.error("Failed to send message:", await response.text());
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h2 className="text-xl font-semibold">Send Message</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="from" className="block">
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
              <label htmlFor="to" className="block">
                To
              </label>
              <input
                type="email"
                id="to"
                name="to"
                value={formData.to}
                onChange={handleChange}
                className="input input-bordered w-full"
                disabled
                required
              />
            </div>
            <div>
              <label htmlFor="name" className="block">
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
              <label htmlFor="phone" className="block">
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
              <label htmlFor="details" className="block">
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
          </form>

          <div className="modal-action">
            <button className="btn bg-gray-300" onClick={() => document.getElementById("my_modal_5").close()}>
              Close
            </button>
            <button className="btn blue-bg hover:blue-bg text-white" type="submit" onClick={handleSubmit}>
              Send Message
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default FoundModal;
