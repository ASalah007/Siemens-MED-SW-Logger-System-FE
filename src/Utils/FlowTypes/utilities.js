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

  const initialX = 60;
  const initialY = 30;
  const groupSpacing = 110;
  const nodeSpacing = 110;

  return Object.entries(map).flatMap(([key, group], i) =>
    group.map((node, j) => ({
      id: "" + node.state_id,
      data: { label: node.name },
      type:
        j === group.length - 1 && grounded
          ? "ground"
          : node.nodeType || nodesType,
      connectable: false,
      position: {
        x: initialX + j * nodeSpacing,
        y: initialY + i * groupSpacing,
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
