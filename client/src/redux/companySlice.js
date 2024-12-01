import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch companies
export const fetchCompanies = createAsyncThunk("companies/fetch", async () => {
  const response = await axios.get("http://localhost:8800/api/admin/getCompanies");

  return response.data.map((company) => {
    const lastCommunication = company.communications.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
    const periodicityDays = parseInt(company.communicationPeriodicity.split(" ")[0]) || 14;

    // Calculate next scheduled communication date based on the last communication date
    const nextScheduledDate = lastCommunication
      ? new Date(lastCommunication.date).setDate(new Date(lastCommunication.date).getDate() + periodicityDays)
      : null;

    return {
      ...company,
      lastFiveCommunications: company.communications
        .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by most recent first
        .slice(0, 5), // Take the last 5 communications
      isOverdue: company.isOverdue,
      isDueToday: company.isDueToday,
      nextScheduledCommunication: nextScheduledDate
        ? new Date(nextScheduledDate).toLocaleDateString() // Format next scheduled communication date
        : null,
    };
  });
});

// Async thunk to delete a company
export const deleteCompany = createAsyncThunk("companies/delete", async (companyId) => {
  await axios.delete(`http://localhost:8800/api/admin/${companyId}`);
  return companyId; 
});

export const updateCompany = createAsyncThunk("companies/update", async ({ id, updatedData }) => {
  const response = await axios.put(`http://localhost:8800/api/admin/${id}`, updatedData);
  return response.data; 
});

const companySlice = createSlice({
  name: "companies",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchCompanies.fulfilled, (state, action) => action.payload)

      .addCase(deleteCompany.fulfilled, (state, action) => {
        return state.filter((company) => company._id !== action.payload); // Remove the deleted company
      })

      
      .addCase(updateCompany.fulfilled, (state, action) => {
        const index = state.findIndex((company) => company._id === action.payload._id);
        if (index !== -1) {
          state[index] = action.payload; 
        }
      });
  },
});

export default companySlice.reducer;
