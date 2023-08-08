import React, { useState } from "react";
import LoginForm from "../../Components/AuthForm/LoginForm"
import authBackground from "../../Resources/authBackground.png";

function LoginPage() {

  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center">
    <div className="w-2/4 ">
        <LoginForm />
    </div>

    <div className="w-2/4 h-full flex items-center justify-center relative ">
        <img className="w-[95%] rounded-3xl object-cover" src={authBackground} alt="background"/>
        <h1 className="w-2/3 font-poppins font-bold text-white text-6xl text-center uppercase leading-relaxed absolute">test results visualiser</h1>
    </div>
    </div>
  );
}

export default LoginPage;