import { flattenObject, getColumnName } from "./utilities";
import { Link } from "react-router-dom";
import LinkIcon from "@mui/icons-material/Link";
export const dataRepresentationTC = (
  data = [],testsuitId , data_columns =[]
) => {
    if(data)
    data.forEach((row) => getColumnName(row, data_columns));
    data_columns.push({
      name: "",
      label: "",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          
          const testcaseId = data[tableMeta.rowIndex].id;
          return (
            <Link
              to={`/validtags?testsuitId=${testsuitId}&testcaseId=${testcaseId}`}
            >
              <LinkIcon className ="custom-link" style={{ color: 'black' }}/>
            </Link>
          );
        },
      },
    });
  
    let count = 0;
    data_columns.unshift({
      name: "INDEX",
      label: "INDEX",
      options: {
        filter: false,
        sort: true,
        customBodyRender: () => {
         if(count === data.length) count = 0; 
          count++;
          return (count);
        },
      },
    });
  return { filteredData : data, data_columns };
};
