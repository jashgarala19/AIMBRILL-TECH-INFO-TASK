import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import "./Table.css";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function NewRow({
  employees,
  handleInput,
  addRowTemp,
  setEditingRow,
  setNewRow,
}) {
  const [joiningDate, setJoiningDate] = useState(null);
  const [birthDate, setBirthDate] = useState(null);
  useEffect(() => {
    console.log(joiningDate, birthDate);
  }, [joiningDate, birthDate]);
  return (
    <>
      <TableRow>
        <TableCell colSpan={2} rowSpan={2}></TableCell>
        {employees.columns.map((col) => {
          return (
            <TableCell
              align="left"
              style={{
                color: "#1A2027",
                fontWeight: "bold",
                border: "1px solid rgba(224, 224, 224, 1)",
              }}
              key={col}
            >
              {col === "joiningDate" ? (
                <DatePicker
                  sx={{ width: "150px" }}
                  value={joiningDate}
                  onChange={(newValue) => {
                    handleInput(newValue.$d, col);
                    // const formattedDate = moment(newValue).format('YYYY-MM-DD');
                    // setJoiningDate(formattedDate);
                    // setJoiningDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              ) : col === "birthDate" ? (
                <DatePicker
                  sx={{ width: "150px" }}
                  value={birthDate}
                  onChange={(newValue) => {
                    handleInput(newValue.$d, col);
                    setBirthDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              ) : col === "salaryDetails" ? (
                <TextField
                  type="number"
                  inputProps={{
                    onBlur: (e) => handleInput(Number(e.target.value), col),
                  }}
                />
              ) : (
                <TextField
                  inputProps={{
                    onBlur: (e) => handleInput(e.target.value, col),
                  }}
                  // onChange={(e)=>handleInput(e.target.value, col)}
                  style={{ width: "100%" }}
                />
              )}
            </TableCell>
          );
        })}
      </TableRow>
      <TableRow>
        <TableCell
          colSpan={employees.columns.length + 2}
          style={{
            border: "1px solid rgba(224, 224, 224, 1)",
          }}
        >
          <Button
            variant="contained"
            style={{ borderRadius: "0px", width: "60%" }}
            size="large"
            onClick={addRowTemp}
          >
            Add
          </Button>
          <Button
            color="error"
            style={{ width: "40%", borderRadius: "0px" }}
            variant="contained"
            size="large"
            onClick={() => {
              setEditingRow(false);
              setNewRow({});
            }}
          >
            Cancel
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}

export default NewRow;
