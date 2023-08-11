import React, { useState } from "react";
import SignupForm from "../../Components/AuthForm/SignupForm"
import AuthBanner from "../../Components/AuthBanner/AuthBanner";
import 'animate.css';


function SignupPage() {

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