import React, { useEffect, useRef, useState } from "react";
import HAccordionHeader from "./HAccoridionHeader";
import { IconButton } from "@mui/material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

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

  const [firstColumnMinimized, setFirstColumnMinimized] = useState(false);
  const [secondColumnMinimized, setSecondColumnMinimized] = useState(false);
  const [thirdColumnMinimized, setThirdColumnMinimized] = useState(false);
  const [fourthColumnMinimized, setFourthColumnMinimized] = useState(false);

  useEffect(() => {
    if (!expanding) return;

    const expand = (e) => {
      e.preventDefault();
      const newLeftWidth = Math.max(
        e.x - divsRef[currentDiv].current.getBoundingClientRect().left,
        250
      );

      const newRightWidth = Math.max(
        divsRef[currentDiv + 1].current.getBoundingClientRect().right - e.x,
        250
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
      {firstColumnMinimized && (
        <MinimizedColumn
          onMaximize={() => setFirstColumnMinimized(false)}
          total={firstHeaderOptions.total}
          failed={firstHeaderOptions.failed}
          title="Test Suites"
        />
      )}
      {secondColumnMinimized && (
        <MinimizedColumn
          onMaximize={() => setSecondColumnMinimized(false)}
          total={secondHeaderOptions.total}
          failed={secondHeaderOptions.failed}
          title="Test Cases"
        />
      )}
      {thirdColumnMinimized && (
        <MinimizedColumn
          onMaximize={() => setThirdColumnMinimized(false)}
          total={thirdHeaderOptions.total}
          failed={thirdHeaderOptions.failed}
          title="Validation Tags"
        />
      )}
      {fourthColumnMinimized && (
        <MinimizedColumn
          onMaximize={() => setFourthColumnMinimized(false)}
          total={fourthHeaderOptions.total}
          failed={fourthHeaderOptions.failed}
          title="Validation Points"
        />
      )}

      {/* first column */}
      {!firstColumnMinimized && (
        <div
          className="w-1/4 flex flex-col pb-10 grow"
          style={{
            width: divsWidth[0] + "px",
            maxWidth: divsWidth[0] + "px",
          }}
          ref={divsRef[0]}
        >
          <div className="shadow-lg z-10">
            <HAccordionHeader
              {...firstHeaderOptions}
              onMinimize={() => setFirstColumnMinimized(true)}
            />
          </div>
          <div className="overflow-y-auto flex gap-2 flex-col pt-5 pb-12">
            {firstColumnElements}
          </div>
        </div>
      )}

      {/* first divider */}
      {!firstColumnMinimized && !secondColumnMinimized && (
        <div
          className="border-gray-400 w-[5px] border-x hover:bg-gray-400 active:bg-blue-500 active:border-blue-500 hover:cursor-col-resize shrink-0"
          onMouseDown={(e) => {
            setCurrentDiv(0);
            setExpanding(true);
          }}
        ></div>
      )}

      {/* second column */}
      {!secondColumnMinimized && (
        <div
          className="w-1/4 flex flex-col pb-10 grow"
          style={{
            width: divsWidth[1] + "px",
            maxWidth: divsWidth[1] + "px",
          }}
          ref={divsRef[1]}
        >
          <div className="shadow z-10">
            <HAccordionHeader
              {...secondHeaderOptions}
              onMinimize={() => setSecondColumnMinimized(true)}
            />
          </div>
          <div className="overflow-y-auto flex gap-2 flex-col pt-5 pb-12">
            {secondColumnElements}
          </div>
        </div>
      )}

      {/* second divider */}
      {(!firstColumnMinimized || !secondColumnMinimized) &&
        !thirdColumnMinimized && (
          <div
            className="border-gray-400 w-[5px] border-x hover:bg-gray-400 active:bg-blue-500 active:border-blue-500 hover:cursor-col-resize shrink-0"
            onMouseDown={(e) => {
              setCurrentDiv(1);
              setExpanding(true);
            }}
          ></div>
        )}

      {/* third column */}
      {!thirdColumnMinimized && (
        <div
          className="w-1/4 flex flex-col pb-10 grow"
          style={{
            width: divsWidth[2] + "px",
            maxWidth: divsWidth[2] + "px",
          }}
          ref={divsRef[2]}
        >
          <div className="shadow z-10">
            <HAccordionHeader
              {...thirdHeaderOptions}
              onMinimize={() => setThirdColumnMinimized(true)}
            />
          </div>
          <div className="overflow-y-auto flex gap-2 flex-col pt-5 pb-12">
            {thirdColumnElements}
          </div>
        </div>
      )}

      {/* third divider */}
      {(!firstColumnMinimized ||
        !secondColumnMinimized ||
        !thirdColumnMinimized) &&
        !fourthColumnMinimized && (
          <div
            className="border-gray-400 w-[5px] border-x hover:bg-gray-400 active:bg-blue-500 active:border-blue-500 hover:cursor-col-resize shrink-0"
            onMouseDown={(e) => {
              setCurrentDiv(2);
              setExpanding(true);
            }}
          ></div>
        )}

      {/* fourth column */}
      {!fourthColumnMinimized && (
        <div
          className="w-1/4 flex flex-col pb-10 grow"
          style={{
            width: divsWidth[3] + "px",
            maxWidth: divsWidth[3] + "px",
          }}
          ref={divsRef[3]}
        >
          <div className="shadow z-10">
            <HAccordionHeader
              {...fourthHeaderOptions}
              onMinimize={() => setFourthColumnMinimized(true)}
            />
          </div>
          <div className="overflow-y-auto flex gap-2 flex-col pt-5 pb-12">
            {fourthColumnElements}
          </div>
        </div>
      )}
    </div>
  );
}

function MinimizedColumn({ total, failed, onMaximize, title }) {
  return (
    <div className="flex flex-col border-r">
      <div className="bg-[#6a4c93] flex flex-col gap-1 h-28 items-center p-1">
        <IconButton onClick={() => onMaximize()}>
          <KeyboardDoubleArrowRightIcon sx={{ color: "#ffca3a" }} />
        </IconButton>
        <div className="text-fail font-bold">
          {failed}/{total}
        </div>
        <div className="text-success font-bold">
          {total - failed}/{total}
        </div>
      </div>
      <div className="flex justify-center items-center w-8 grow">
        <div className="-rotate-90 text-2xl whitespace-nowrap">{title}</div>
      </div>
    </div>
  );
}

export default HAccordion;
