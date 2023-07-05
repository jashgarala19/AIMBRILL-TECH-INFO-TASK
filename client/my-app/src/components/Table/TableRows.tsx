import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { AiOutlineExpandAlt } from "react-icons/ai";
import "./Table.css";
function Table_Row({
  data,
  index,
  handleDelete,
  handleOpen,
  employees,
  check,
}) {
  return (
    <>
      <TableRow key={"_" + data + index}>
        <TableCell
          align="center"
          sx={{
            border: "1px solid rgba(224, 224, 224, 1)",
          }}
        >
          <Checkbox
            size="medium"
            onChange={(e) => handleDelete(e, data)}
            checked={check.includes(data.employeeID)}
          ></Checkbox>
        </TableCell>
        <TableCell align="center">
          <AiOutlineExpandAlt
            size="25"
            style={{ marginTop: "10px", cursor: "pointer" }}
            onClick={() => handleOpen(data)}
          />
        </TableCell>
        {employees.columns.map((v) => {
          return (
            <TableCell
              align="left"
              sx={{
                color: "#1A2027",
                fontWeight: "500",
                border: "1px solid rgba(224, 224, 224, 1)",
              }}
            >
              {
                v === "skills" ? data[v].join(", ") : data[v]
                // data[v]
              }
            </TableCell>
          );
        })}
      </TableRow>
    </>
  );
}

export default Table_Row;
