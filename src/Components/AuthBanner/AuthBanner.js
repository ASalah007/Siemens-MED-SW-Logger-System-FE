import React from "react";
import authBackground from "../../Resources/authBackground.png";

function AuthBanner() {

  return (

    <div className="w-2/4 h-full flex items-center justify-center relative animate__animated animate__fadeIn ">
        <img className="w-[95%] rounded-3xl object-cover" src={authBackground} alt="background"/>
        <h1 className="w-2/3 font-poppins font-bold text-white text-6xl text-center uppercase leading-relaxed absolute">test results visualiser</h1>
    </div>

  );
}

export default AuthBanner   ;