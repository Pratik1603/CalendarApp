import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchNotifications = createAsyncThunk("notifications/fetch", async () => {
  
  const response = await axios.get("http://localhost:8800/api/notifications");
  console.log(response.data);   
  return response.data;
});

const notificationSlice = createSlice({
  name: "notifications",
  initialState: { overdue: [], today: [], count: 0 },

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
        state.overdue = action.payload.overdue || [];
        state.today = action.payload.today || [];
        state.count = action.payload.count || 0;
      });
      
  },
});

export default notificationSlice.reducer;
