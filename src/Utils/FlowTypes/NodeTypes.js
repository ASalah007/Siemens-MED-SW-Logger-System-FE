import { Handle, Position } from "reactflow";
import AlignHorizontalCenterIcon from "@mui/icons-material/AlignHorizontalCenter";
import React, { memo } from "react";
import { Tooltip } from "@mui/material";

function HNode({ data, isConnectable }) {
  return (
    <div className="w-28 border border-black rounded flex items-center justify-center relative hover:cursor-pointer">
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        style={{ opacity: 0 }}
      />
      <div className="overflow-hidden grow px-1">
        <span className="font-semibold text-sm break-words">{data.label}</span>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        style={{ opacity: 0 }}
      />
    </div>
  );
}

const VNode = memo(({ data, isConnectable, borderColor, textColor }) => {
  return (
    <Tooltip title={data.tooltip}>
      <div
        className={
          "w-28 border rounded flex items-center justify-center relative hover:cursor-pointer " +
          (borderColor || "border-black")
        }
      >
        <Handle
          type="target"
          position={Position.Top}
          isConnectable={isConnectable}
          style={{ opacity: 0 }}
        />
        <div className="overflow-hidden grow px-1">
          <span className={"font-semibold text-sm break-words " + textColor}>
            {data.label}
          </span>
        </div>
        <Handle
          type="source"
          position={Position.Bottom}
          isConnectable={isConnectable}
          style={{ opacity: 0 }}
        />
      </div>
    </Tooltip>
  );
});

const Ground = memo(({ data, isConnectable }) => {
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div className="w-full flex justify-center">
        <AlignHorizontalCenterIcon
          fontSize="large"
          className="-translate-y-1"
        />
      </div>

      <Handle
        type="source"
        position={Position.Top}
        isConnectable={isConnectable}
      />
    </>
  );
});

const Parent = memo(({ data, isConnectable }) => {
  return (
    <div className="w-28 border border-black rounded flex items-center justify-center relative py-2 hover:cursor-pointer hover:border-blue-500 hover:border-2">
      <div className="absolute -top-1 right-0.5 text-xs text-blue-500 font-bold">
        s
      </div>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        style={{ opacity: 0 }}
      />
      <div className="overflow-hidden grow px-1">
        <span className="font-semibold text-sm break-words">{data.label}</span>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        style={{ opacity: 0 }}
      />
    </div>
  );
});

const Child = memo(({ data, isConnectable }) => {
  return (
    <div className="w-28 border-2 border-blue-500 rounded flex items-center justify-center relative hover:cursor-pointer">
      <Handle
        id="main"
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        style={{ opacity: 0 }}
      />

      <Handle
        id="secondary"
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        style={{ opacity: 0 }}
      />
      <div className="overflow-hidden grow px-1">
        <span className="font-semibold text-sm break-words">{data.label}</span>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        style={{ opacity: 0 }}
      />
    </div>
  );
});

const Validation = memo(({ data, isConnectable, borderStyle, textStyle }) => {
  return (
    <div
      className={
        "w-36 border-2 rounded-full flex items-center justify-center relative py-1 hover:cursor-pointer " +
        borderStyle
      }
    >
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        style={{ opacity: 0 }}
      />
      <div className="overflow-hidden grow px-1 flex items-center justify-center">
        <span
          className={
            "font-semibold text-sm break-words max-w-full " + textStyle
          }
        >
          {data.label}
        </span>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        style={{ opacity: 0 }}
      />
    </div>
  );
});

const Label = memo(({ data, isConnectable }) => {
  return (
    <div className="w-36 whitespace-nowrap">
      <div className="overflow-hidden grow px-1">
        <span className="font-semibold text-sm break-words">{data.label}</span>
      </div>
    </div>
  );
});

const DeadValidation = memo((props) => {
  return (
    <Validation
      {...props}
      borderStyle="border-orange-300 hover:border-orange-500"
      textStyle="text-orange-400"
    />
  );
});

const PassedValidation = memo((props) => {
  return (
    <Validation
      {...props}
      borderStyle="border-success hover:border-green-300"
      textStyle="text-green-500"
    />
  );
});

const FailedValidation = memo((props) => {
  return (
    <Validation
      {...props}
      borderStyle="border-fail hover:border-red-300"
      textStyle="text-red-500"
    />
  );
});

const nodeTypes = {
  "h-node": HNode,
  "v-node": VNode,
  ground: Ground,
  parent: Parent,
  child: Child,
  passedValidation: PassedValidation,
  failedValidation: FailedValidation,
  deadValidation: DeadValidation,
  label: Label,
};
export default nodeTypes;
