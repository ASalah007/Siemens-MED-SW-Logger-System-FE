import React, { useEffect, useRef, useState } from "react";
import HAccordionHeader from "./HAccoridionHeader";

function HAccordion({
  firstColumnElements,
  secondColumnElements,
  thirdColumnElements,
  fourthColumnElements,

  firstHeaderOptions,
  secondHeaderOptions,
  thirdHeaderOptions,
  fourthHeaderOptions,
}) {
  const [divsWidth, setDivsWidth] = useState([]);
  const divsRef = [useRef(), useRef(), useRef(), useRef()];
  const [currentDiv, setCurrentDiv] = useState(0);
  const [expanding, setExpanding] = useState(false);

  useEffect(() => {
    if (!expanding) return;

    const expand = (e) => {
      e.preventDefault();
      const newLeftWidth = Math.max(
        e.x - divsRef[currentDiv].current.getBoundingClientRect().left,
        100
      );

      const newRightWidth = Math.max(
        divsRef[currentDiv + 1].current.getBoundingClientRect().right - e.x,
        100
      );

      setDivsWidth((oldWidths) => {
        const newWidths = [...oldWidths];
        newWidths[currentDiv] = Math.max(newLeftWidth, 20);
        newWidths[currentDiv + 1] = Math.max(newRightWidth, 20);
        return newWidths;
      });
    };

    const cancelExpanding = () => setExpanding(false);
    window.addEventListener("mousemove", expand);
    window.addEventListener("mouseup", cancelExpanding);

    return () => {
      window.removeEventListener("mousemove", expand);
      window.removeEventListener("mouseup", cancelExpanding);
    };
  }, [expanding, currentDiv]);

  return (
    <div className="flex grow max-h-screen">
      {/* first column */}
      <div
        className="w-1/4 flex flex-col pb-10"
        style={{
          width: divsWidth[0] + "px",
          maxWidth: divsWidth[0] + "px",
        }}
        ref={divsRef[0]}
      >
        <div className="shadow-lg z-10">
          <HAccordionHeader {...firstHeaderOptions} />
        </div>
        <div className="overflow-y-auto flex gap-2 flex-col pt-5 pb-12">
          {firstColumnElements}
        </div>
      </div>

      {/* first divider */}
      <div
        className="border-gray-400 w-[5px] border-x hover:bg-gray-400 active:bg-blue-500 active:border-blue-500 hover:cursor-col-resize shrink-0"
        onMouseDown={(e) => {
          setCurrentDiv(0);
          setExpanding(true);
        }}
      ></div>

      {/* second column */}
      <div
        className="w-1/4 flex flex-col pb-10"
        style={{
          width: divsWidth[1] + "px",
          maxWidth: divsWidth[1] + "px",
        }}
        ref={divsRef[1]}
      >
        <div className="shadow z-10">
          <HAccordionHeader {...secondHeaderOptions} />
        </div>
        <div className="overflow-y-auto flex gap-2 flex-col pt-5 pb-12">
          {secondColumnElements}
        </div>
      </div>

      {/* second divider */}
      <div
        className="border-gray-400 w-[5px] border-x hover:bg-gray-400 active:bg-blue-500 active:border-blue-500 hover:cursor-col-resize shrink-0"
        onMouseDown={(e) => {
          setCurrentDiv(1);
          setExpanding(true);
        }}
      ></div>

      {/* third column */}
      <div
        className="w-1/4 flex flex-col pb-10"
        style={{
          width: divsWidth[2] + "px",
          maxWidth: divsWidth[2] + "px",
        }}
        ref={divsRef[2]}
      >
        <div className="shadow z-10">
          <HAccordionHeader {...thirdHeaderOptions} />
        </div>
        <div className="overflow-y-auto flex gap-2 flex-col pt-5 pb-12">
          {thirdColumnElements}
        </div>
      </div>

      {/* third divider */}
      <div
        className="border-gray-400 w-[5px] border-x hover:bg-gray-400 active:bg-blue-500 active:border-blue-500 hover:cursor-col-resize shrink-0"
        onMouseDown={(e) => {
          setCurrentDiv(2);
          setExpanding(true);
        }}
      ></div>

      {/* fourth column */}
      <div
        className="w-1/4 flex flex-col pb-10"
        style={{
          width: divsWidth[3] + "px",
          maxWidth: divsWidth[3] + "px",
        }}
        ref={divsRef[3]}
      >
        <div className="shadow z-10">
          <HAccordionHeader {...fourthHeaderOptions} />
        </div>
        <div className="overflow-y-auto flex gap-2 flex-col pt-5 pb-12">
          {fourthColumnElements}
        </div>
      </div>
    </div>
  );
}

export default HAccordion;
