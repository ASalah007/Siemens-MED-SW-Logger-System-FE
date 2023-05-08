import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import data from "../../Data/log.json";
import { getColumnName } from "../../Utils/utilities";
import { Container, Dialog, Divider, Grid } from "@mui/material";
import ExpandableRowTable from "../../Components/NewTable/NewTable";
import { Box } from "@mui/material";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import "./ValidationTag.css";

let filteredData = null;
export default function ValidationTag() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const testsuitId = searchParams.get("testsuitId");
  const testcaseId = searchParams.get("testcaseId");

  const [selectedRow, setSelectedRow] = useState(-1);
  const [openDialogs, setOpenDialogs] = useState([]);
  useEffect(() => {
    //fetch(`http://localhost:8080/validationTags/testSuites/${testsuitId}/testCases/${testcaseId}}`)
    fetch(`http://localhost:8080/validationTags/testCases?testSuite.id=${testsuitId}&testCase.id=${testcaseId}`)
     //fetch(`http://localhost:8080/validationTags/testCases?testSuite.id=643f8524f71037820114afea&testCase.id=643f8524f71037820114afe9`)
      .then(response => response.json())
      .then(data => {
        if(data && data.length != 0)  
        {
          setData(data);
        }
        console.log("validation taga: ",data);
      })
      .catch(error => console.error(error));
  }, []); 

  let [flattenedData, setflattenedData] = useState([
    {
      _id: "none",
    },
  ]);

  const [data, setData] = useState([
    {
      id: "none",
    },
  ]);

  useEffect(() => {
    if (selectedRow !== -1) {
      setOpenDialogs(data[selectedRow]["validationPoints"].map(() => false));
    }
  }, [data, selectedRow]);

  const toggleDialog = (index) => {
    const newOpenDialogs = [...openDialogs];
    newOpenDialogs[index] = !newOpenDialogs[index];
    setOpenDialogs(newOpenDialogs);
  };

  let data_columns = [];
  data.forEach((row) => getColumnName(row, data_columns));

  const handleRowClick = (rowIdx) => {
    rowIdx === selectedRow ? setSelectedRow(-1) : setSelectedRow(rowIdx);
  };

  let sad = [];
  let meta = [];
  let combinedData = [];

  if(typeof data[0] !== 'undefined' && typeof data[0]['validationPoints'] !== 'undefined'){
    // console.log('data > mete',data[0]['metaData']);
    // loop over the data and get metadata only 
    //flattenedData = data.map((item) => flattenObject(item));  

     for(let i = 0 ; i < data.length ; i++){
      meta.push(data[i]['metaData']);
     }  
      console.log('meta',meta);

  }
  if(meta){
    console.log('flattenedData  ',flattenedData);
    if(data_columns){


        filteredData = data.map((item) => {
          const filteredItem = {};
          Object.keys(item).forEach((key) => {
            if (data_columns.some((column) => column.name.substring(column.name.lastIndexOf(".") + 1) === key)) {
              filteredItem[key] = item[key];
            }
          });
          return filteredItem;
        });

        let metaFiltered = meta.map((item) => {
          const filteredItem = {};
          Object.keys(item).forEach((key) => {
            if (data_columns.some((column) => column.name.substring(column.name.lastIndexOf(".") + 1) === key)) {
              filteredItem[key] = item[key];
            }
          });
          return filteredItem;
        });

        combinedData = filteredData.map((item, index) => {
          return { ...item, ...metaFiltered[index] };
        });

    }
  console.log('filteredData',filteredData);
  return (
    <Container maxWidth="x">
      
      <ExpandableRowTable
        title="Validation Tags"
        Data={combinedData}
        regularColumns={data_columns}
        expandable={false}
        onRowClickEnabled={true}
        onRowClick={handleRowClick}
      />

      <section className="validation_points_section">
        <Box>
          {selectedRow === -1 ? (
            <h2 className="validation_points_header">
              Click on a row to show validation points
            </h2>
          ) : (
            <div>
            <h2 className="validation_points_header">
              Validation Points 
            </h2>
            <h2 className="validation_points_header">
            {data[selectedRow]["name"]}
            </h2>
          </div>
            // <h2 className="validation_points_header">Validation Points </h2>
            // <h2 className="validation_points_header">Validation Points of {data[selectedRow]["name"]}  </h2>
            // <h3 validation_points_header> {data[selectedRow]["name"]}</h3>
          )}
        </Box>

        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 6, sm: 10, md: 11, lg: 12 }}
          direction="row"
          justifyContent="space-evenly"
          className="validation_points_container"
        >
          {selectedRow !== -1 &&
            data[selectedRow]["validationPoints"].map((valid_point, idx) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  
                  <Box className="validation_point scale-up-center">
                    <TreeView
                      aria-label="file system navigator"
                      defaultCollapseIcon={<ExpandMoreIcon />}
                      defaultExpandIcon={<ChevronRightIcon />}
                      sx={{
                        height: 300,
                        flexGrow: 1,
                        maxWidth: 400,
                        overflowY: "auto",
                      }}
                    >
                      {Object.keys(valid_point).map((valid_key) => {
                        if (valid_key !== "results") {
                          return (
                            <>
                              <TreeItem nodeId={valid_key} label={valid_key}>
                                {Object.keys(valid_point[valid_key]).map(
                                  (valid_data) => {
                                    return (
                                      <TreeItem
                                        nodeId={valid_data}
                                        label={
                                          valid_data +
                                          ": " +
                                          valid_point[valid_key][valid_data]
                                        }
                                      />
                                    );
                                  }
                                )}
                              </TreeItem>
                              <Divider className="divider" />
                            </>
                          );
                        }
                      })}
                    </TreeView>
                    <button
                      className="results_btn"
                      onClick={() => toggleDialog(idx)}
                    >
                      Results
                    </button>
                    <Dialog
                      onClose={() => toggleDialog(idx)}
                      open={openDialogs[idx]}
                    >
                      {valid_point["results"].forEach((result) =>
                        getColumnName(result, sad)
                      )}
                      <ExpandableRowTable
                        Data={valid_point["results"]}
                        regularColumns={sad}
                        expandable={false}
                        onRowClickEnabled={false}
                      />
                    </Dialog>
                  </Box>
                </Grid>
              );
            })}
        </Grid>
      </section>
    </Container>
  );
          }
}