import { Link, useNavigate } from "react-router-dom";
import { useAuthState, useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";
import toast from "react-hot-toast";
import LoginWithGoogle from "../components/Auth/LoginWithGoogle";
import { useEffect } from "react";

const Register = () => {
  const [createUserWithEmailAndPassword, , loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [user] = useAuthState(auth);


  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const confirm_password = form.confirm_password.value;

    // Validate inputs
    if (!name || !email || !password || !confirm_password) {
      return toast.error("All fields are required!");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters long!");
    }

    if (password !== confirm_password) {
      return toast.error("Passwords do not match!");
    }

    try {
      // Create user
      const userCredential = await createUserWithEmailAndPassword(email, password);

      // Update profile with name
      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName: name });

        // Send email verification
        await sendEmailVerification(userCredential.user);
        toast.success("Verification email sent! Please check your inbox.", {
            duration: 5000, 
          });
      }

      // Redirect to login or another page
      navigate("/login");
      
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/login");
    }
  }, [user,navigate]);

  return (
    <div className="">
      <div className="hero bg-white min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse w-full">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleRegister} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  name="confirm_password"
                  placeholder="confirm password"
                  className="input input-bordered"
                  required
                />
              </div>
              <label className="label">
                <Link
                  to={"/login"}
                  className="label-text-alt link link-hover blue-text"
                >
                  Already Have Account? <span>Login</span>
                </Link>
              </label>
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn blue-bg hover:blue-bg text-white"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </div>
              {error && (
                <p className="text-sm text-red-500 mt-2">
                  {error.message.replace("Firebase:", "").trim()}
                </p>
              )}
            </form>
            <LoginWithGoogle/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
