import React from "react";
import ParticlesBackground from "../Welcome/ParticlesBackground";
import fof from "../../Resources/404.svg";
import { Link } from "react-router-dom";

export default function FOFPage() {
  return (
    <>
      <ParticlesBackground />
      <div className="w-screen h-screen bg-white flex flex-col items-center">
        <div className="z-10">
          <img src={fof} alt="cool 404" />
        </div>
        <div>you must be a hacker to come over here :O.</div>
        <div className="z-10">
          if you are a normal programmer{" "}
          <Link to="/" className="text-blue-800 underline">
            click me
          </Link>{" "}
          to take you home
        </div>
      </div>
    </>
  );
}
