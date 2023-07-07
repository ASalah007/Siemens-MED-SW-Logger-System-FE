import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { config } from "../../Resources/particlesjs-config";

function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div className="">
      <Particles id="tsparticles" init={particlesInit} options={config} />
    </div>
  );
}

export default ParticlesBackground;
