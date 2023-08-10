import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

const pushColumn = (data_columns, inputKey) => {
  let modifiedKey = inputKey.split("_");
  let newColumn = {
    name: inputKey,
    label: modifiedKey.join(" "),
    options: {
      display:
        inputKey === "_id" || inputKey === "id" || inputKey === "__v"
          ? "excluded"
          : true,
      setCellHeaderProps: () => {
        return {
          className: "tableHeadCell",
        };
      },
      setCellProps: () => {
        return {
          className: inputKey === "owner" ? "tableCell ownerCell" : "tableCell",
        };
      },
      filterOptions: {
        renderValue: (value) => {
          if (value === "" || value === null || value === undefined) {
            return "(empty)";
          } else if (typeof value === "boolean") {
            return value ? "True" : "False";
          }
          return value;
        },
      },
      customBodyRender: (value) => {
        if (typeof value === "boolean")
          return value ? (
            <CheckIcon className="success-class" />
          ) : (
            <ClearIcon className="failed-class" />
          );
        else if (value === "pass") {
          return <span className="pass">{value}</span>;
        } else if (value === "fail") {
          return <span className="fail">{value}</span>;
        } else return value;
      },
    },
  };
  if (
    data_columns &&
    !data_columns.find((column) => {
      return JSON.stringify(column) === JSON.stringify(newColumn);
    })
  ) {
    data_columns.push(newColumn);
  }
};

export const getColumnName = (data, data_columns) => {
  Object.keys(data).forEach((key) => {
    if (typeof data[key] !== "object") {
      pushColumn(data_columns, key);
    } else if (key === "metaData") {
      const obj = data[key];
      Object.keys(obj).forEach((objKey) => {
        if (
          data_columns &&
          !data_columns.find((column) => column.name === objKey) &&
          objKey !== "metaData" &&
          objKey !== "design_info" &&
          typeof obj[objKey] !== "object"
        ) {
          pushColumn(data_columns, objKey);
        }
      });
    }
  });
  return data_columns;
};

export const isNumber = (item) => {
  for (let i = 0; i < item.length; i++) {
    if ((item[i] > "a" && item[i] < "z") || (item[i] > "A" && item[i] < "Z"))
      return false;
  }
  return true;
};

export const flattenObject = (obj) => {
  return Object.keys(obj).reduce((acc, key) => {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      Object.assign(acc, flattenObject(obj[key]));
    } else {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
};

export const getFilteredData = (data, data_columns) => {
  if (typeof data !== "undefined" && data !== null && data.length > 0) {
    data.map((item) => {
      const filteredItem = {};
      Object.keys(item).forEach((key) => {
        if (
          data_columns.some(
            (column) =>
              column.name.substring(column.name.lastIndexOf(".") + 1) === key
          )
        ) {
          filteredItem[key] = item[key];
        }
      });
      return filteredItem;
    });
  }
};

export const cleanData = (str) => {
  if (Number.isInteger(str)) return str;
  str = str.slice().replaceAll("_", " ");
  str = str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return word.toUpperCase();
    })
    .replace(/\s+/g, " ");
  return str;
};

export const getItemId = (item, nestedData) => {
  let itemN = "Not Found";
  if (nestedData[item]["id"] !== undefined) itemN = nestedData[item]["id"];
  else if (nestedData[item]["master_id"] !== undefined)
    itemN = nestedData[item]["master_id"];
  else if (nestedData[item]["slave_id"] !== undefined)
    itemN = nestedData[item]["slave_id"];
  else if (nestedData[item]["Port Offset"] !== undefined)
    itemN = nestedData[item]["Port Offset"];
  else return item;

  return itemN;
};

export function formatDuration(milliseconds) {
  if (milliseconds < 1000) return String(milliseconds + "ms");
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  // Calculate the remaining time
  seconds %= 60;
  minutes %= 60;

  // Create the formatted string
  let formattedDuration = "";
  if (hours > 0) formattedDuration += hours + "h ";
  if (minutes > 0) formattedDuration += minutes + "m ";
  if (seconds > 0) formattedDuration += seconds + "s";

  return formattedDuration.trim();
}

export function getConnectedComponents(graph) {
  const visited = new Set();
  const components = [];

  for (let node in graph) {
    if (!visited.has(node)) {
      const component = [];
      dfs(node, component);
      components.push(component);
    }
  }
  return components;

  function dfs(node, component) {
    if (visited.has(node)) return;
    visited.add(node);
    component.push(node);

    const neighbor = graph[node];
    dfs(neighbor, component);
  }
}

export function getNodes(connectedComponents) {
  const nodes = [];

  const style = {
    borderRadius: "10px",
    width: "40px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  let currentX = 10;
  let currentY = 30;
  const componentSpacing = 120;
  const nodeSpacing = 70;

  for (let i = 0; i < connectedComponents.length; i++) {
    const component = connectedComponents[i];
    const componentSize = component.length;

    for (let j = 0; j < componentSize; j++) {
      const nodeId = component[j];
      const node = {
        id: nodeId,
        position: { x: currentX, y: currentY },
        data: { label: nodeId },
        style,
        connectable: false,
      };
      nodes.push(node);

      currentX += nodeSpacing;
    }

    currentY += componentSpacing;
    currentX = 10;
  }

  return nodes;
}

export function getEdges(graph) {
  const edges = Object.entries(graph).map(([source, target]) => ({
    id: `e${source}-${target}`,
    source,
    target,
  }));

  return edges;
}

export function titlize(title) {
  title = title
    .split("_")
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .join(" ");

  return title;
}

export function ensureArray(objectOrArray) {
  if (Array.isArray(objectOrArray)) return objectOrArray;
  return Object.values(objectOrArray);
}
