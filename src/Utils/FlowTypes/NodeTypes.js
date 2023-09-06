import { Handle, Position } from "reactflow";
import AlignVerticalCenterIcon from "@mui/icons-material/AlignVerticalCenter";

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

function Ground({ data, isConnectable }) {
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <div className="w-full flex items-center justify-stretch">
        <AlignVerticalCenterIcon fontSize="large" />
      </div>

      <Handle
        type="source"
        position={Position.Left}
        isConnectable={isConnectable}
      />
    </>
  );
}

function Parent({ data, isConnectable }) {
  return (
    <div className="w-24 border border-black rounded flex items-center justify-center relative py-2 hover:cursor-pointer hover:border-[#ff5050]">
      <div className="absolute -top-1 right-0.5 text-xs text-[#ff5050] font-bold">
        s
      </div>
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

function Child({ data, isConnectable }) {
  return (
    <div className="w-24 border border-[#ff5050] rounded flex items-center justify-center relative">
      <Handle
        id="main"
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        style={{ opacity: 0 }}
      />

      <Handle
        id="top"
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
        position={Position.Right}
        isConnectable={isConnectable}
        style={{ opacity: 0 }}
      />
    </div>
  );
}

const nodeTypes = {
  "h-node": HNode,
  ground: Ground,
  parent: Parent,
  child: Child,
};
export default nodeTypes;
