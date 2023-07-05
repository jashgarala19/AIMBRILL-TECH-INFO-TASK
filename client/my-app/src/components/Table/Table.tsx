import { useAppSelector } from "../../app/hooks";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { useAppDispatch } from "../../app/hooks";
import {
  addEmployee,
  deleteEmployee,
  employeesAdd,
  editEmployee,
  employeeAdd,
  employeesDelete,
  fetchEmployees,
  updateEmployee,
} from "../../features/employee/employeeslice";
import { useState, useRef, useCallback, useEffect } from "react";
import "./Table.css";
import Edit from "../EditData/Edit";
import TableHeader from "./TableHead";
import TableMainBody from "./TableBody";
import { isEqual } from "lodash";
import getTableColumns from "../../utils/getTableColumns";

const DetailsTable = () => {
  const dispatch = useAppDispatch();
  const employees: object = useAppSelector((state) => state.employees);
  const isLoading = useAppSelector((state) => state.employees.loading);
  const [editingRow, setEditingRow] = useState(false);
  const [newRow, setNewRow] = useState({});
  const [check, setCheck] = useState([]);
  const [rowEditData, setRowEditData] = useState({});
  const updatedDataRef = useRef(rowEditData);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [rowEditData, dispatch]);
  const handleOpen = (data) => {
    setRowEditData(data);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleInput = (value, column) => {
    console.log(value);
    if (column === "skills") {
      console.log(value.split(","));
      setNewRow((prev) => ({
        ...prev,
        [column]: value.split(","),
      }));
    } else {
      setNewRow((prev) => ({
        ...prev,
        [column]: value,
      }));
    }
  };

  const addRowTemp = () => {
    let DataFilled = true;
    console.log(newRow);
    employees.columns.forEach((column) => {
      if (!newRow[column]) {
        // If any field in the new row is empty, exit without adding the row
        DataFilled = false;
      }
    });
    if (DataFilled) {
      // dispatch(addEmployee(newRow));

      dispatch(employeeAdd(newRow));
      setEditingRow(false);
      setNewRow({});

      console.log(newRow);
    } else {
      alert("fill");
    }
  };

  const deleteRows = () => {
    // dispatch(deleteEmployee(check));
    dispatch(employeesDelete(check));

    setCheck([]);
  };
  const handleDelete = (e, data) => {
    if (e.currentTarget.checked) {
      setCheck((prev) => {
        return [...prev, data.employeeID];
      });
    } else {
      setCheck((prev) =>
        prev.filter((item) => !isEqual(item, data.employeeID))
      );
    }
  };

  // const handleEditData = useCallback((e, key) => {
  //   setRowEditData((prev) => ({ ...prev, [key]: e.target.value }));
  // }, []);

  const handleUpdate = useCallback(
    (d, id) => {
      let updatedObj=d;
      if(d.skills){
         updatedObj = {
          ...d,
          skills: d.skills.split(","),
        }
      }
   
  
      // const updatedData = {
      //   ...updatedDataRef.current,
      //   ...d,
      // };
      // console.log(updatedData);
      // dispatch(updateEmployee(updatedData));

      console.log(updatedObj, id);
      dispatch(editEmployee({data:updatedObj,id:id}));
      handleClose();
    },
    [rowEditData]
  );

  return (
    <>
   

      <TableContainer component={Paper} className="tableDiv">
        <Table
          sx={{ minWidth: 650, marginTop: "10px", width: "100%" }}
          aria-label="customized table"
        >
          {/* <TableHead>
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
          </TableHead> */}

          <TableHeader
            check={check}
            deleteRows={deleteRows}
            employees={employees}
          />
          {/* <TableBody>
            {employees.employees.map((data, index) => {
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
                  </TableRow>
                </>
              );
            })}

            {editingRow == true && (
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
                </TableRow>
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
          </TableBody> */}

          <TableMainBody
            employees={employees}
            handleDelete={handleDelete}
            check={check}
            handleOpen={handleOpen}
            editingRow={editingRow}
            handleInput={handleInput}
            addRowTemp={addRowTemp}
            setEditingRow={setEditingRow}
            setNewRow={setNewRow}
          />
        </Table>
      </TableContainer>
      {/* {open && <EditComponent />} */}
      {open && (
        <Edit
          data={rowEditData}
          // handleEditData={handleEditData}
          handleUpdate={handleUpdate}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export default DetailsTable;
