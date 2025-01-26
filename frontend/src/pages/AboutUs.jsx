import Title from "../components/shared/Title";
import { Link } from "react-router-dom";

const AboutUs = () => {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-10">
          {/* Header Section */}
          <div className="text-center mb-12">
            <Title text="About Us"/>
            <p className="text-gray-600 text-lg mt-4">
              Welcome to <span className="font-semibold">ManusherKhoj</span>! We aim to connect people, empower communities, and make finding solutions effortless and secure.
            </p>
          </div>
  
          {/* Our Story Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-secondary text-center mb-6">Our Story</h2>
            <p className="text-gray-700 text-lg text-center max-w-4xl mx-auto">
              <span className="font-semibold">ManusherKhoj</span> began with a simple idea: to create a platform that bridges gaps and connects people in meaningful ways. Over time, our passion for empowering individuals has grown into a mission to build a trustworthy, accessible, and reliable platform. Whether you&apos;re searching for opportunities, services, or information, we are here to help you every step of the way.
            </p>
          </div>
  
          {/* Vision & Mission Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-2xl font-bold text-secondary mb-4">Our Vision</h2>
              <p className="text-gray-700">
                At <span className="font-semibold">ManusherKhoj</span>, we envision a world where people can find trusted solutions and meaningful connections effortlessly. We strive to bring people closer through innovation, trust, and collaboration.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-secondary mb-4">Our Mission</h2>
              <p className="text-gray-700">
                Our mission is to be the go-to platform for connecting people and resources. We are dedicated to creating a secure and transparent space where everyone can thrive and succeed.
              </p>
            </div>
          </div>
  
          {/* Core Values Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-accent text-center mb-6">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-white shadow-md rounded-lg">
                <h3 className="text-xl font-semibold blue-text mb-2">Integrity</h3>
                <p className="text-gray-600">
                  We believe in maintaining the highest level of honesty and transparency in everything we do.
                </p>
              </div>
              <div className="p-6 bg-white shadow-md rounded-lg">
                <h3 className="text-xl font-semibold blue-text mb-2">Community</h3>
                <p className="text-gray-600">
                  Building a supportive and inclusive community is at the heart of our mission.
                </p>
              </div>
              <div className="p-6 bg-white shadow-md rounded-lg">
                <h3 className="text-xl font-semibold blue-text mb-2">Innovation</h3>
                <p className="text-gray-600">
                  We constantly strive to improve and innovate to meet the evolving needs of our users.
                </p>
              </div>
            </div>
          </div>
  
          {/* Team Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-secondary text-center mb-6">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <img
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                  src="https://res.cloudinary.com/dyaofxcyl/image/upload/v1737386311/Hassan_Nahid_-yellow-background_akqhh3.png"
                  alt="Team Member"
                />
                <h3 className="text-xl font-semibold blue-text">Hassan Nahid</h3>
                <p className="text-gray-600">Founder & CEO</p>
              </div>
              <div className="text-center">
                <img
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                  src="https://st3.depositphotos.com/3581215/18899/v/450/depositphotos_188994514-stock-illustration-vector-illustration-male-silhouette-profile.jpg"
                  alt="Team Member"
                />
                <h3 className="text-xl font-semibold blue-text">Unknown</h3>
                <p className="text-gray-600">Head of Marketing</p>
              </div>
              <div className="text-center">
                <img
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                  src="https://res.cloudinary.com/dyaofxcyl/image/upload/v1737386311/Hassan_Nahid_-yellow-background_akqhh3.png"
                  alt="Team Member"
                />
                <h3 className="text-xl font-semibold blue-text">Hassan Nahid</h3>
                <p className="text-gray-600">Lead Developer</p>
              </div>
            </div>
          </div>
  
          {/* Call-to-Action Section */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-accent mb-4">Join Us on Our Journey</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Together, we can make <span className="font-semibold">ManusherKhoj</span> a platform that connects and inspires communities across the globe. Join us today and be a part of this journey.
            </p>
            <Link to={"/"} className="btn blue-bg hover:blue-bg text-white my-6">Get Started</Link>
          </div>
        </div>
      </div>
    );
  };
  
  export default AboutUs;
  