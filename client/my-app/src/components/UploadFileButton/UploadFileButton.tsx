import { Button } from "@mui/material";
import { FileType } from "../../utils/fileFormat";
function ImportFileButton({
  handleFileImport
}: {
  handleFileImport: (e) => void;
}) {
  const handleInputChange = (e) => {
    if (FileType.includes(e.target.files?.[0].type)) {
      handleFileImport(e);
    } else {
      alert("Please Upload correct File Format");
    }
  };
  return (
    <>
      <label htmlFor="upload-file">
        <input
          style={{ display: "none" }}
          id="upload-file"
          name="upload-file"
          type="file"
          accept=".xlsx, .xls, .csv"
          onChange={handleInputChange}
        />
        <Button color="primary" variant="contained" component="span">
          Upload File
        </Button>
      </label>
    </>
  );
}

export default ImportFileButton;
