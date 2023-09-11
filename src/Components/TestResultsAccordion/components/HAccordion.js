import React, { useEffect, useRef, useState } from "react";
import HAccordionHeader from "./HAccoridionHeader";
import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import TablePagination from "../../TablePagination/TablePagination";

function HAccordion({
  firstColumnElements,
  secondColumnElements,
  thirdColumnElements,
  fourthColumnElements,

  firstHeaderOptions,
  secondHeaderOptions,
  thirdHeaderOptions,
  fourthHeaderOptions,

  firstColumnPlaceHolder,
  secondColumnPlaceHolder,
  thirdColumnPlaceHolder,
  fourthColumnPlaceHolder,

  firstColumnCount,
  firstColumnPage,
  firstColumnRowsPerPage,
  onFirstColumnPageChange,
  onFirstColumnRowsPerPageChange,

  secondColumnCount,
  secondColumnPage,
  secondColumnRowsPerPage,
  onSecondColumnPageChange,
  onSecondColumnRowsPerPageChange,

  thirdColumnCount,
  thirdColumnPage,
  thirdColumnRowsPerPage,
  onThirdColumnPageChange,
  onThirdColumnRowsPerPageChange,

  fourthColumnCount,
  fourthColumnPage,
  fourthColumnRowsPerPage,
  onFourthColumnPageChange,
  onFourthColumnRowsPerPageChange,

  firstColumnLoading,
  secondColumnLoading,
  thirdColumnLoading,
  fourthColumnLoading,

  nostats,
  paginationFreeMode,
}) {
  const [divsWidth, setDivsWidth] = useState([]);
  const divsRef = [useRef(), useRef(), useRef(), useRef()];
  const [currentDiv, setCurrentDiv] = useState(0);
  const [expanding, setExpanding] = useState(false);

  const [minimized, setMinimized] = useState([false, false, false, false]);

  function minimize(column, value) {
    setMinimized((o) => {
      const nw = [...o];
      nw[column] = value;
      return nw;
    });
  }

  // control resizing
  useEffect(() => {
    if (!expanding) return;

    const expand = (e) => {
      e.preventDefault();

      let rightColumn = currentDiv + 1;
      let leftColumn = -1;
      let newRightWidth = -1,
        newLeftWidth = -1;
      for (let i = rightColumn - 1; i >= 0; i--) {
        if (!minimized[i]) {
          leftColumn = i;
          break;
        }
      }
      const MINWIDTH = 280;

      let dw = e.x - divsRef[leftColumn].current.getBoundingClientRect().right;

      const leftWidth = divsRef[leftColumn].current.offsetWidth;
      const rightWidth = divsRef[rightColumn].current.offsetWidth;
      if (
        (dw > 0 && rightWidth > MINWIDTH + dw) ||
        (dw < 0 && leftWidth > MINWIDTH - dw)
      ) {
        newRightWidth = rightWidth - dw;
        newLeftWidth = leftWidth + dw;
      }

      if (newLeftWidth === -1 || newRightWidth === -1) return;

      setDivsWidth((oldWidths) => {
        const newWidths = [...oldWidths];
        newWidths[leftColumn] = newLeftWidth;
        newWidths[rightColumn] = newRightWidth;
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
  }, [expanding, currentDiv, minimized]);

  const [displayed, setDisplayed] = useState([false, false, false, false]);
  useEffect(() => {
    const elements = [
      firstColumnElements,
      secondColumnElements,
      thirdColumnElements,
      fourthColumnElements,
    ];

    const loadings = [
      firstColumnLoading,
      secondColumnLoading,
      thirdColumnLoading,
      fourthColumnLoading,
    ];

    setDisplayed((o) => {
      const newDisplayed = [...o];
      elements.forEach((e, i) => {
        if ((e.length || loadings[i]) && !o[i]) newDisplayed[i] = true;
      });
      return newDisplayed;
    });
  }, [
    firstColumnElements,
    secondColumnElements,
    thirdColumnElements,
    fourthColumnElements,
    firstColumnLoading,
    secondColumnLoading,
    thirdColumnLoading,
    fourthColumnLoading,
  ]);

  const showFirstColumn = !minimized[0];
  const showFirstDivider =
    !minimized[0] &&
    !minimized[1] &&
    (secondColumnElements.length > 0 || displayed[1]);

  const showSecondColumn =
    !minimized[1] && (secondColumnElements.length > 0 || displayed[1]);
  const showSecondDivider =
    (!minimized[0] || !minimized[1]) &&
    !minimized[2] &&
    (thirdColumnElements.length > 0 || displayed[2]);

  const showThirdColumn =
    !minimized[2] && (thirdColumnElements.length > 0 || displayed[2]);
  const showThirdDivider =
    (!minimized[0] || !minimized[1] || !minimized[2]) &&
    !minimized[3] &&
    (fourthColumnElements.length > 0 || displayed[3]);

  const showFourthColumn =
    !minimized[3] && (fourthColumnElements.length > 0 || displayed[3]);

  const currentSolution = sessionStorage.getItem("connectedSolution");
  return (
    <div className="flex grow max-h-full bg-gray-50">
      {minimized[0] && (
        <MinimizedColumn
          onMaximize={() => minimize(0, false)}
          total={firstHeaderOptions.total}
          failed={firstHeaderOptions.failed}
          title={firstColumnPlaceHolder}
          nostats={nostats}
        />
      )}
      {minimized[1] && (
        <MinimizedColumn
          onMaximize={() => minimize(1, false)}
          total={secondHeaderOptions.total}
          failed={secondHeaderOptions.failed}
          title={secondColumnPlaceHolder}
          nostats={nostats}
        />
      )}
      {minimized[2] && (
        <MinimizedColumn
          onMaximize={() => minimize(2, false)}
          total={thirdHeaderOptions.total}
          failed={thirdHeaderOptions.failed}
          title={thirdColumnPlaceHolder}
          nostats={nostats}
        />
      )}
      {minimized[3] && (
        <MinimizedColumn
          onMaximize={() => minimize(3, false)}
          total={fourthHeaderOptions.total}
          failed={fourthHeaderOptions.failed}
          title={fourthColumnPlaceHolder}
          nostats={nostats}
        />
      )}

      {/* first column */}
      {showFirstColumn && (
        <div
          className="w-1/4 flex flex-col pb-10 grow"
          style={{
            width: divsWidth[0] + "px",
          }}
          ref={divsRef[0]}
        >
          <div className="shadow-lg z-10">
            <HAccordionHeader
              {...firstHeaderOptions}
              onMinimize={() => minimize(0, true)}
            />
          </div>
          <div>
            <TablePagination
              count={firstColumnCount}
              page={firstColumnPage}
              rowsPerPage={firstColumnRowsPerPage}
              onPageChange={onFirstColumnPageChange}
              onRowsPerPageChange={onFirstColumnRowsPerPageChange}
              freeMode={paginationFreeMode}
            />
          </div>
          <div className="overflow-y-auto flex gap-2 flex-col pt-5 pb-12">
            {firstColumnLoading ? (
              <div className="flex justify-center items-end h-52">
                <CircularProgress thickness={5} />
              </div>
            ) : (
              firstColumnElements
            )}
          </div>
        </div>
      )}

      {/* first divider */}
      {showFirstDivider && (
        <div
          className="border-gray-400 w-[5px] border-x hover:bg-gray-400 active:bg-blue-500 active:border-blue-500 hover:cursor-col-resize shrink-0"
          onMouseDown={(e) => {
            setCurrentDiv(0);
            setExpanding(true);
          }}
        ></div>
      )}

      {/* second column */}
      {showSecondColumn && (
        <div
          className="w-1/4 flex flex-col pb-10 grow"
          style={{
            width: divsWidth[1] + "px",
          }}
          ref={divsRef[1]}
        >
          <div className="shadow z-10">
            <HAccordionHeader
              {...secondHeaderOptions}
              onMinimize={() => minimize(1, true)}
            />
          </div>
          <div>
            <TablePagination
              count={secondColumnCount}
              page={secondColumnPage}
              rowsPerPage={secondColumnRowsPerPage}
              onPageChange={onSecondColumnPageChange}
              onRowsPerPageChange={onSecondColumnRowsPerPageChange}
              freeMode={paginationFreeMode}
            />
          </div>
          <div className="overflow-y-auto flex gap-2 flex-col pt-5 pb-12">
            {secondColumnLoading ? (
              <div className="flex justify-center items-end h-52">
                <CircularProgress thickness={5} />
              </div>
            ) : (
              secondColumnElements
            )}
          </div>
        </div>
      )}

      {/* second divider */}
      {showSecondDivider && (
        <div
          className="border-gray-400 w-[5px] border-x hover:bg-gray-400 active:bg-blue-500 active:border-blue-500 hover:cursor-col-resize shrink-0"
          onMouseDown={(e) => {
            setCurrentDiv(1);
            setExpanding(true);
          }}
        ></div>
      )}

      {/* third column */}
      {showThirdColumn && (
        <div
          className="w-1/4 flex flex-col pb-10 grow"
          style={{
            width: divsWidth[2] + "px",
          }}
          ref={divsRef[2]}
        >
          <div className="shadow z-10">
            <HAccordionHeader
              {...thirdHeaderOptions}
              onMinimize={() => minimize(2, true)}
            />
          </div>
          <div>
            <TablePagination
              count={thirdColumnCount}
              page={thirdColumnPage}
              rowsPerPage={thirdColumnRowsPerPage}
              onPageChange={onThirdColumnPageChange}
              onRowsPerPageChange={onThirdColumnRowsPerPageChange}
              freeMode={paginationFreeMode}
            />
          </div>
          <div className="overflow-y-auto flex gap-2 flex-col pt-5 pb-12">
            {thirdColumnLoading ? (
              <div className="flex justify-center items-end h-52">
                <CircularProgress thickness={5} />
              </div>
            ) : (
              thirdColumnElements
            )}
          </div>
        </div>
      )}

      {/* third divider */}
      {showThirdDivider && (
        <div
          className="border-gray-400 w-[5px] border-x hover:bg-gray-400 active:bg-blue-500 active:border-blue-500 hover:cursor-col-resize shrink-0"
          onMouseDown={(e) => {
            setCurrentDiv(2);
            setExpanding(true);
          }}
        ></div>
      )}

      {/* fourth column */}
      {showFourthColumn && (
        <div
          className="w-1/4 flex flex-col pb-10 grow"
          style={{
            width: divsWidth[3] + "px",
          }}
          ref={divsRef[3]}
        >
          <div className="shadow z-10">
            <HAccordionHeader
              {...fourthHeaderOptions}
              onMinimize={() => minimize(3, true)}
            />
          </div>
          <div>
            <TablePagination
              count={fourthColumnCount}
              page={fourthColumnPage}
              rowsPerPage={fourthColumnRowsPerPage}
              onPageChange={onFourthColumnPageChange}
              onRowsPerPageChange={onFourthColumnRowsPerPageChange}
              freeMode={paginationFreeMode}
            />
          </div>
          <div className="overflow-y-auto flex gap-2 flex-col pt-5 pb-12">
            {fourthColumnLoading ? (
              <div className="flex justify-center items-end h-52">
                <CircularProgress thickness={5} />
              </div>
            ) : (
              fourthColumnElements
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function MinimizedColumn({ total, failed, onMaximize, title, nostats }) {
  return (
    <div className="flex flex-col border-r">
      <div className="bg-[#2D3047] flex flex-col gap-1 h-28 items-center p-1">
        <Tooltip title="Maximize" placement="top" disableInteractive>
          <IconButton onClick={() => onMaximize()}>
            <KeyboardDoubleArrowRightIcon sx={{ color: "#ffca3a" }} />
          </IconButton>
        </Tooltip>
        {!nostats && (
          <>
            <div className="text-fail font-bold">
              {failed}/{total}
            </div>
            <div className="text-success font-bold">
              {total - failed}/{total}
            </div>
          </>
        )}
      </div>
      <div className="flex justify-center items-center w-8 grow">
        <div className="-rotate-90 text-2xl whitespace-nowrap">{title}</div>
      </div>
    </div>
  );
}

export default HAccordion;
