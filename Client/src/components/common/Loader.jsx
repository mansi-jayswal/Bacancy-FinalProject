import React from "react";
import { PulseLoader } from "react-spinners";
function Loader() {
  return (
    <div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center w-screen h-screen z-10 bg-[rgba(0,0,0,0.2)]">
        <div className="z-50">
          <PulseLoader color="#6D2932" margin={2} size={20} />
        </div>
      </div>
    </div>
  );
}

export default Loader;
