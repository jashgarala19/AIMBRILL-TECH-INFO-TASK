import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { Button, TextField } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import "./Edit.css";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";

import Typography from "@mui/material/Typography";
function Edit({ data, handleUpdate, handleClose }) {
  // const rowEditDataKeys = Object.keys(data);

  const [d, setD] = useState(data);
  const [updatedFields, setUpdatedFields] = useState();
  const [joiningDate, setJoiningDate] = useState(null);
  const [birthDate, setBirthDate] = useState(null);

  useEffect(() => {
    // const a = new Date(d.joiningDate);
    // const b = new Date(d.birthDate);
    // setJoiningDate(a);
    // console.log(data.joiningDate);
    // setBirthDate(b);
    setD(data);
    console.log(updatedFields);
  }, [data]);

  const handleEditDataa = useCallback((e, key) => {

      setD((prev) => ({ ...prev, [key]: e }));
      setUpdatedFields((prev) => ({ ...prev, [key]: e }));
    
  }, []);

  return (
    <>
      <div className="EditDiv">
        <div className="EditDivHeader">
          <span className="closeEditDivIcon">
            <RxCross2 size="30" onClick={handleClose} />
          </span>
          <Typography fontSize={30}>Edit</Typography>
        </div>
        <div className="EditDivBody">
          {Object.entries(d).map(([key, value]) => (
            <div key={key}>
              {key === "joiningDate" ? (
                <DatePicker
                  sx={{ width: "150px" }}
                  value={joiningDate}
                  onChange={(newValue) => {
                    setJoiningDate(newValue);
                    handleEditDataa(newValue.$d, key);
                    // const formattedDate = moment(newValue).format('YYYY-MM-DD');
                    // setJoiningDate(formattedDate);
                    // setJoiningDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              ) : key === "birthDate" ? (
                <DatePicker
                  sx={{ width: "150px" }}
                  value={birthDate}
                  onChange={(newValue) => {
                    setBirthDate(newValue);
                    handleEditDataa(newValue.$d, key);
                    // setBirthDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              ) : key === "salaryDetails" ? (
                <TextField
                  fullWidth
                  type="number"
                  name={key}
                  value={value}
                  onChange={(e) => handleEditDataa(Number(e.target.value), key)}
                />
              ) : (
                <TextField
                  fullWidth
                  name={key}
                  value={value}
                  onChange={(e) => handleEditDataa(e.target.value, key)}
                />
              )}
              {/* <Typography>{key}</Typography>
              <TextField
                fullWidth
                name={key}
                value={value}
                onChange={(e) => handleEditDataa(e, key)}
              /> */}
            </div>
          ))}
        </div>
        <div className="EditDivFooter">
          <Button
            variant="contained"
            fullWidth
            size="large"
            sx={{ height: "65px", borderRadius: "0px" }}
            onClick={() => handleUpdate(updatedFields, d.employeeID)}
          >
            <Typography fontSize={20}>Save and Close</Typography>
          </Button>
        </div>
      </div>
    </>
  );
}

export default React.memo(Edit);
