import theme from "./utils/theme";
import { ThemeProvider } from "@mui/material/styles";
import Details from "./pages/Details/Details";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers";
function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}> 
      <ThemeProvider theme={theme}>
        <Details name="Employee"/>
      </ThemeProvider>
      </LocalizationProvider>
    </>
  );
}

export default App;
