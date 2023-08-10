import React from "react";
import { BarLoader } from "react-spinners";

const Loader = (props) => {

  return (
    <div className="flex w-full pt-[1rem] justify-center">
      <BarLoader color={props.color} width={"100%"} />
    </div>
  );
};

export default Loader;
