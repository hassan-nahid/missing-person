import { Link, useNavigate } from "react-router-dom";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "../firebase/firebase.config";
import toast from "react-hot-toast";
import { useEffect } from "react";
import LoginWithGoogle from "../components/Auth/LoginWithGoogle";

const Login = () => {
  const [signInWithEmailAndPassword, user, , error] = useSignInWithEmailAndPassword(auth); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await signInWithEmailAndPassword(email, password);
    } catch (err) {
      toast.error(err.message || "Login failed!");
    }
  };
  console.log(user)

  useEffect(() => {
    // Check if user is logged in and email is verified
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        if (user.emailVerified) {
          toast.success("Login successful!");
          navigate("/"); 
        } else {
          toast.error("Please verify your email before logging in.");
          auth.signOut(); 
        }
      }
    });

    return () => {
      unsubscribe(); 
    };
  }, [navigate]);
  

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse w-full">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleLogin} className="card-body">
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
                <label className="label">
                  <Link
                    to={"/register"}
                    className="label-text-alt link link-hover blue-text"
                  >
                    Don&apos;t Have Account? <span>Register</span>
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn blue-bg hover:blue-bg text-white">
                  Login
                </button>
              </div>
            </form>
            {error && (
              <p className="text-center text-red-500 mt-2">
                {error.message}
              </p>
            )}
             <LoginWithGoogle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
