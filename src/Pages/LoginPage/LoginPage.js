import React, { useEffect } from "react";
import LoginForm from "../../Components/AuthForm/LoginForm"
import AuthBanner from "../../Components/AuthBanner/AuthBanner";
import { useNavigate} from "react-router-dom";
import UserContext from "../../Contexts/UserContext";
import 'animate.css';

function LoginPage() {
  const navigate = useNavigate();
  const user = React.useContext(UserContext);

  useEffect(() => {
    if(user){
      navigate("/");
    }
  }, []);


  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center">
    <div className="w-2/4 animate__animated animate__fadeInLeft">
        <LoginForm />
    </div>

    <AuthBanner/>
    </div>
  );
}

export default LoginPage;