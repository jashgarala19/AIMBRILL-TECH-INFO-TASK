import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const baseURL = "http://localhost:8080/api/v1/";
const options = { year: "numeric", month: "2-digit", day: "2-digit" };
const initialState = {
  loading: false,
  employees: [],
  columns: [],
  error: "",
};

export const employeesAdd = createAsyncThunk(
  "employees/employeesadd",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/employee/bulk",
        {
          data: data,
        }
      );
      return response.data.data.map((e) => {
        if (e.joiningDate) {
          return {
            ...e,
            birthDate: new Date(e.birthDate).toLocaleDateString("en-US"),
            joiningDate: new Date(e.joiningDate).toLocaleDateString("en-US"),
          };
        }
      });

      // return response.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response.data);
    }
  }
);

export const employeesDelete = createAsyncThunk(
  "employees/employeesdelete",
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      const response = await axios.delete(
        "http://localhost:8080/api/v1/employee",
        {
          data: data,
        }
      );
      return data;

      // return response.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response.data);
    }
  }
);

export const employeeAdd = createAsyncThunk(
  "employees/employeeadd",
  async (data, { rejectWithValue }) => {
    try {
      console.log(data);
      const response = await axios.post(
        "http://localhost:8080/api/v1/employee",
        {
          data: data,
        }
      );
      // return response.data;

      return {
        ...data,
        birthDate: new Date(data.birthDate).toLocaleDateString(
          "en-US",
          options
        ),
        joiningDate: new Date(data.joiningDate).toLocaleDateString(
          "en-US",
          options
        ),
      };

      // return response.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response.data);
    }
  }
);
export const fetchEmployees = createAsyncThunk(
  "employee/fetchEmployees",
  async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/employee");
      console.log(response.data);
      return response.data.map((e) => {
        if (e.joiningDate) {
          return {
            ...e,
            birthDate: new Date(e.birthDate).toLocaleDateString(
              "en-US",
              options
            ),
            joiningDate: new Date(e.joiningDate).toLocaleDateString(
              "en-US",
              options
            ),
          };
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
);

export const editEmployee = createAsyncThunk(
  "employee/editEmployees",
  async ({ data, id }) => {
    try {
      console.log(data, id);

      const response = await axios.put(
        `http://localhost:8080/api/v1/employee/${id}`,
        data
      );
      if (data.birthDate) {
        return [
          {
            ...data,
            birthDate: new Date(data.birthDate).toLocaleDateString(
              "en-US",
              options
            ),
          },
          id,
        ];
      } else if (data.joiningDate) {
        return [
          {
            ...data,
            joiningDate: new Date(data.joiningDate).toLocaleDateString(
              "en-US",
              options
            ),
          },
          id,
        ];
      } else {
        return [data, id];
      }
    } catch (e) {
      console.log(err);
    }
  }
);
const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    // setEmployees: (state, action) => {
    //   state.employees = action.payload;
    // },
    // setColumns: (state, action) => {
    //   state.columns = action.payload;
    // },
    // addEmployee: (state, action) => {
    //   state.employees.push(action.payload);
    // },
    // deleteEmployee: (state, action) => {
    //   state.employees = state.employees.filter((e) => {
    //     return ![...action.payload].some(
    //       (obj) => JSON.stringify(obj) === JSON.stringify(e)
    //     );
    //   });
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEmployees.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchEmployees.fulfilled, (state, action) => {
      state.loading = false;
      state.employees = action.payload;
      state.error = "";
      if (state.employees.length > 0)
        state.columns = Object.keys(state.employees[0]);
      // state.columns  = [Object.keys(action.payload[0])]
    });
    builder.addCase(fetchEmployees.rejected, (state, action) => {
      state.loading = false;
      state.employees = [];
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(employeesAdd.fulfilled, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.employees = [...action.payload, ...state.employees];
      if (state.employees.length > 0)
        state.columns = Object.keys(state.employees[0]);
    });
    builder.addCase(employeesAdd.rejected, (state, action) => {
      state.error = "ID alreadt exist check your file";
    });
    builder.addCase(employeesDelete.fulfilled, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      // state.employees = state.employees.filter((e) => {
      //   return ![...action.payload].some(
      //     (obj) => JSON.stringify(obj) === JSON.stringify(e)
      //   );
      state.employees = state.employees.filter(
        (e) => !action.payload.includes(e.employeeID)
      );
    });
    builder.addCase(employeeAdd.fulfilled, (state, action) => {
      console.log(action.payload);
      state.employees = [action.payload, ...state.employees];
    });

    builder.addCase(editEmployee.fulfilled, (state, action) => {
      console.log(action.payload);

      state.employees = state.employees.map((e) => {
        console.log(e.employeeID);
        if (action.payload[1] == e.employeeID) {
          return {
            ...e,
            ...action.payload[0],
          };
        }
        return e;
      });

      // state.employees = [...action.payload, ...state.employees];
    });
  },
});

export const {
  setEmployees,
  setColumns,
  addEmployee,
  deleteEmployee,
  updateEmployee,
} = employeeSlice.actions;

export default employeeSlice.reducer;
