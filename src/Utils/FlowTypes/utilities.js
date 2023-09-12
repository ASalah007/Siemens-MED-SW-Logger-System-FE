export function animatedEdgeOnSelection({ nodes, edges, setNodes, setEdges }) {
  setEdges((old) => {
    const nw = [...old];
    nw.map((e) => {
      const edgeAffected =
        nodes.length > 0 &&
        (e.source === nodes[0].id || e.target === nodes[0].id);

      e.animated = edgeAffected;
      e.type = edgeAffected && "start-end";

      return e;
    });
    return nw;
  });
}

export function getNodesFromMap(map, nodesType, grounded) {
  const style = {
    borderRadius: "10px",
    width: "40px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const initialX = 100;
  const initialY = 30;
  const groupSpacing = 170;
  const nodeSpacing = 75;

  return Object.entries(map).flatMap(([key, group], i) =>
    group.map((node, j) => ({
      id: "" + node.state_id,
      data: {
        label: node.name,
        tooltip:
          node.parent_id && node.parent_id !== "None" ? "Slave State" : "",
        isChild: node.parent_id && node.parent_id !== "None",
      },
      type:
        j === group.length - 1 && grounded
          ? "ground"
          : node.nodeType || nodesType,
      connectable: false,
      position: {
        x: initialX + i * groupSpacing,
        y: initialY + j * nodeSpacing,
      },
      style,
      draggable: false,
    }))
  );
}

export function getEdgesFromMap(map) {
  return Object.entries(map).flatMap(([key, group], i) =>
    group.map((node, j) => ({
      id: `e${node.id}-${node.connectedTo}`,
      source: "" + node.state_id,
      target: "" + node.connectedTo,
    }))
  );
}
