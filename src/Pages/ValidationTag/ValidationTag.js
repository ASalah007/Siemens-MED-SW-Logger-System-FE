import { Container} from "@mui/material";
import ExpandableRowTable from "../../Components/NewTable/NewTable";
import "./ValidationTag.css";
import ValidaitonPoint from "../../Components/ValidationPoint/ValidationPoint";
import ValidationTagHook from "../../Hook/validation-tag-hook";

export default function ValidationTag() {
  const [combinedData,data_columns,handleRowClick,data,selectedRow] = ValidationTagHook();
    return (
      <Container maxWidth="xl">
        <ExpandableRowTable
          title="Validation Tags"
          Data={combinedData}
          regularColumns={data_columns}
          expandable={false}
          onRowClickEnabled={true}
          onRowClick={handleRowClick}
        />
        <ValidaitonPoint data={data} selected_row={selectedRow} />
      </Container>
    );
  }
