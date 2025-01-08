import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { FcGoogle } from "react-icons/fc";
import auth from "../../firebase/firebase.config";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginWithGoogle = () => {
    const navigate = useNavigate();

    const [signInWithGoogle, user] = useSignInWithGoogle(auth);
    
    const handleLoginWithGoogle = async () => {
        try {
            await signInWithGoogle();
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        if(user) {
            navigate("/");
        }
    }, [user, navigate]);
  return (
    <div className="flex flex-col items-center justify-center mb-10">
        <div className="divider mx-8">OR</div>
        <button className="btn" onClick={handleLoginWithGoogle}><FcGoogle className="text-4xl"/></button>
        <h1 className="mt-2">Login With Google</h1>
    </div>
  )
}

export default LoginWithGoogle