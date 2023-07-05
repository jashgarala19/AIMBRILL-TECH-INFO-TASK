import UploadFileButton from "../../components/UploadFileButton/UploadFileButton";
import Table from "../../components/Table/Table";
import excelToJSON from "../../utils/excelToJSON";
import { useAppDispatch } from "../../app/hooks";
import {
  employeesAdd,
  fetchEmployees,
  setColumns,
  setEmployees,
} from "../../features/employee/employeeslice";
import getTableColumns from "../../utils/getTableColumns";
import { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import ExcelDateToJSDate from "../../utils/excelDateToJSDate";

const Details = ({ name }: { name: string }) => {
  const dispatch = useAppDispatch();
  const employees: object = useAppSelector((state) => state.employees);
  // const error: object = useAppSelector((state) => state.employees.error);

  const handleFileImport = async (e) => {
    const jsondata: object[] = await excelToJSON(e); //convert excel to json
    const columns = getTableColumns(jsondata[0] as object); //get dynamic columns
    // dispatch(setColumns(columns)); //set dynamic columns to store
    // dispatch(setEmployees(jsondata)); //set  json data to store
    // console.log(jsondata);
    const mapped = jsondata.map((e) => {
      return {
        ...e,
        birthDate: new Date(ExcelDateToJSDate(e.birthDate)),
        joiningDate: new Date(ExcelDateToJSDate(e.joiningDate)),
        skills: e.skills ? e.skills.split(",") : [],
      };
    });

    console.log(mapped);
    dispatch(employeesAdd(mapped));
  };
  useEffect(() => {}, [dispatch]);

  return (
    <>
      <div>
        <h1>{name} Details</h1>
        <UploadFileButton handleFileImport={handleFileImport} />
        <Table />
      </div>
    </>
  );
};

export default Details;
