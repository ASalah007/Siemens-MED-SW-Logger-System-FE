import React, { useEffect } from "react";
import SignupForm from "../../Components/AuthForm/SignupForm"
import AuthBanner from "../../Components/AuthBanner/AuthBanner";
import { useNavigate} from "react-router-dom";
import UserContext from "../../Contexts/UserContext";
import 'animate.css';


function SignupPage() {
  const navigate = useNavigate();
  const user = React.useContext(UserContext);

  useEffect(() => {
    if(user){
      navigate("/");
    }
  }, []);

  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center">
      <AuthBanner/>
    
    <div className="w-2/4 animate__animated animate__fadeInRight">
        <SignupForm />
    </div>
    </div>
  );
}

export default SignupPage;