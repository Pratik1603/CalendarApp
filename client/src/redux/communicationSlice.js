import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const logCommunication = createAsyncThunk(
    "communications/log",
    async ({ selectedCompanies, communicationDetails }, thunkAPI) => {
      try {
        console.log(selectedCompanies);
        console.log(communicationDetails);
        const responses = await Promise.all(
            selectedCompanies.map(async (companyId) => {
            const response = await axios.post(
              "http://localhost:8800/api/user/logCommunication",
              { companyId, ...communicationDetails }
            );
            return response.data;
          })
        );
        return responses; 
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
);
  

const communicationSlice = createSlice({
  name: "communications",
  initialState: [],
  reducers: {},
});

export default communicationSlice.reducer;
