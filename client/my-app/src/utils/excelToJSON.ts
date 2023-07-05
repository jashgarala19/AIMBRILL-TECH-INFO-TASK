import * as XLSX from "xlsx";
import { v4 as uuidv4 } from "uuid";
const excelToJSON = (e): Promise<object[]> => {
  //create a promise to send the JSON data after file read;
  return new Promise((resolve, reject) => {
    const reader = new FileReader(); //declare a FileReader object to read the csv file
    reader.readAsBinaryString(e.target.files[0]); //read the given csv

    //after the file is done reading  you will get the data in e.targe.result in the callback
    reader.onload = async (e) => {
      const data = e.target?.result;

      //use XLSX library to convert the given data into json
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetname = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetname];

      const parsedData = XLSX.utils.sheet_to_json(sheet);

      console.log(parsedData);

      console.log(uuidv4());
      resolve(parsedData);
    };

    reader.onerror = (error) => {
      reject(error);
    };
  });
};

export default excelToJSON;
