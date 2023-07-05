import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Button, TextField } from "@mui/material";
import "./Table.css";
import Table_Row from "./TableRows";
import NewRow from "./NewRow";

function TableMainBody({
  employees,
  handleDelete,
  check,
  handleOpen,
  editingRow,
  handleInput,
  addRowTemp,
  setEditingRow,
  setNewRow,
}) {
  return (
    <>
      <TableBody>
        {employees.employees.map((data, index) => {
          return (
            <>
              {/* <TableRow key={"_" + data + index}>
                <TableCell
                  align="center"
                  sx={{
                    border: "1px solid rgba(224, 224, 224, 1)",
                  }}
                >
                  <Checkbox
                    size="medium"
                    onChange={(e) => handleDelete(e, data)}
                    checked={check.includes(data)}
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
                      {data[v]}
                    </TableCell>
                  );
                })}
              </TableRow> */}
              <Table_Row
                data={data}
                index={index}
                handleDelete={handleDelete}
                handleOpen={handleOpen}
                employees={employees}
                check={check}
              />
            </>
          );
        })}

        {editingRow == true && (
          <>
            {/* <TableRow>
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
                  >
                    <TextField
                      inputProps={{
                        onBlur: (e) => handleInput(e.target.value, col),
                      }}
                      style={{ width: "100%" }}
                    />
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
            </TableRow> */}

            <NewRow employees={employees}handleInput={handleInput} addRowTemp={addRowTemp} setEditingRow ={setEditingRow}setNewRow ={setNewRow}/>
          </>
        )}
        {employees.columns.length > 0 && editingRow == false && (
          <TableRow>
            <TableCell
              align="center"
              colSpan={employees.columns.length + 2}
              style={{ backgroundColor: "#fefdfd" }}
            >
              <Button
                style={{
                  width: "100%",
                  fontWeight: "bold",
                  borderRadius: "0px",
                }}
                onClick={() => setEditingRow(true)}
                variant="contained"
              >
                Add
              </Button>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </>
  );
}

export default TableMainBody;
