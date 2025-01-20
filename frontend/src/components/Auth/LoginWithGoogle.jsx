import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { FcGoogle } from "react-icons/fc";
import auth from "../../firebase/firebase.config";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LoginWithGoogle = () => {
  const navigate = useNavigate();
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  const handleLoginWithGoogle = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      toast.error(err.message || "Google login failed!");
    }
  };

  useEffect(() => {
    const sendUserToBackend = async (user) => {
      const { email, displayName } = user.user; // Extract email and name
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            name: displayName || "Unknown User", // Fallback for name
          }),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success("Login with Google successful!");
          localStorage.setItem("token", data.token); // Store the token securely
          navigate("/");
        } else {
          toast.error(data.message || "Failed to save user on the server!");
        }
      } catch (err) {
        toast.error(err.message || "Server error!");
      }
    };

    if (user) {
      sendUserToBackend(user);
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col items-center justify-center mb-10">
      <div className="divider mx-8">OR</div>
      <button
        className="btn"
        onClick={handleLoginWithGoogle}
        disabled={loading} // Disable button when loading
      >
        <FcGoogle className="text-4xl" />
      </button>
      <h1 className="mt-2">Login With Google</h1>
      {error && <p className="text-red-500 mt-2">{error.message}</p>}
    </div>
  );
};

export default LoginWithGoogle;
