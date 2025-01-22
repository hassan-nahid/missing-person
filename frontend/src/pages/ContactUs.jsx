import Title from "../components/shared/Title";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('https://formspree.io/f/xaygvblq', formData);
            toast.success('Message sent successfully!', {
                position: 'top-center',
                duration: 2000,
            });
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error(error);
            toast.error('Error sending message. Please try again later.', {
                position: 'top-center',
                duration: 2000,
            });
        }
    };

    return (
        <div className="min-h-screen bg-white py-16">
            <div className="container mx-auto px-6 md:px-12">
                {/* Contact Us Header */}
                <div className="text-center mb-12">
                    <Title text="Contact Us" />
                    <p className="text-lg text-gray-600 my-6">
                        We’re here to assist you! Feel free to reach out with any inquiries.
                    </p>
                </div>

                {/* Contact Information Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
                    <div className="p-8 bg-white rounded-lg shadow-xl text-center md:text-left">
                        <h2 className="text-3xl font-semibold blue-text mb-4">Reach Out</h2>
                        <p className="text-gray-600 mb-6">
                            We would love to hear from you! Below are the ways you can reach us.
                        </p>
                        <ul className="space-y-4 text-gray-700 text-lg">
                            <li>
                                <strong className="blue-text">Email:</strong>
                                <a href="mailto:contact@manusherkhoj.com" className="hover:text-sky-500"> contact@manusherkhoj.com</a>
                            </li>
                            <li>
                                <strong className="blue-text">Phone:</strong>
                                <span> +8801780365440</span>
                            </li>
                            <li>
                                <strong className="blue-text">Address:</strong>
                                <span> Sirajganj, Bangladesh</span>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Form Section */}
                    <div className="p-8 bg-white rounded-lg shadow-xl">
                        <h2 className="text-3xl font-semibold blue-text mb-4">Send Us a Message</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    id="name"
                                    className="input input-bordered w-full p-4 bg-gray-50 text-gray-700 border-2 border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 rounded-md transition duration-200"
                                    placeholder="Your Name"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    id="email"
                                    className="input input-bordered w-full p-4 bg-gray-50 text-gray-700 border-2 border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 rounded-md transition duration-200"
                                    placeholder="Your Email"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    id="message"
                                    className="textarea textarea-bordered w-full p-4 bg-gray-50 text-gray-700 border-2 border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 rounded-md transition duration-200"
                                    placeholder="Your Message"
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="btn w-full py-4 rounded-md blue-bg text-white hover:blue-bg transition duration-200">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>

               
            </div>
        </div>
    );
};

export default ContactUs;
