import { Handle, Position } from "reactflow";
import AlignHorizontalCenterIcon from "@mui/icons-material/AlignHorizontalCenter";

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

function VNode({ data, isConnectable, borderColor, textColor }) {
  return (
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
  );
}

function Ground({ data, isConnectable }) {
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
}

function Parent({ data, isConnectable }) {
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
}

function Child({ data, isConnectable }) {
  return (
    <div className="w-28 border-2 border-blue-500 rounded flex items-center justify-center relative">
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
}

function Validation({ data, isConnectable, passNode = true }) {
  return (
    <div
      className={
        "w-36 border-2 rounded-full flex items-center justify-center relative py-1 hover:cursor-pointer " +
        (passNode
          ? "border-success hover:border-green-300"
          : "border-fail hover:border-red-300")
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
            "font-semibold text-sm break-words max-w-full " +
            (passNode ? "text-green-500" : "text-red-500")
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
}

function Label({ data, isConnectable }) {
  return (
    <div className="w-36 whitespace-nowrap">
      <div className="overflow-hidden grow px-1">
        <span className="font-semibold text-sm break-words">{data.label}</span>
      </div>
    </div>
  );
}

function Dead({ data, isConnectable }) {
  return VNode({
    data,
    isConnectable,
    borderColor: "border-gray-300",
    textColor: "text-gray-300",
  });
}

const nodeTypes = {
  "h-node": HNode,
  "v-node": VNode,
  ground: Ground,
  parent: Parent,
  child: Child,
  passedValidation: (data) => Validation({ ...data, passNode: true }),
  failedValidation: (data) => Validation({ ...data, passNode: false }),
  label: Label,
  dead: Dead,
};
export default nodeTypes;
