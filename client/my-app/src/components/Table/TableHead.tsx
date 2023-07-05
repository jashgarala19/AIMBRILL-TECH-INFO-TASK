import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import { AiFillDelete } from "react-icons/ai";
import TableRow from "@mui/material/TableRow";

import "./Table.css";
import { useTheme } from "@mui/material/styles";

function TableHeader({ check, deleteRows, employees }) {
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;
  const secondaryColor = theme.palette.secondary.main;

  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell
            align="center"
            sx={{
              backgroundColor: check.length > 0 ? primaryColor : "",
              padding: 0,
              lineHeight: 0,
            }}
            colSpan={2}
          >
            {check.length > 0 && (
              <>
                <AiFillDelete
                  size="25px"
                  className="deleteIcon"
                  color={secondaryColor}
                  onClick={deleteRows}
                />
              </>
            )}
          </TableCell>

          {employees.columns.map((col, index) => {
            return <TableCell sx={{ fontWeight: "bold" }}>{col}</TableCell>;
          })}
        </TableRow>
      </TableHead>
    </>
  );
}
export default TableHeader;
