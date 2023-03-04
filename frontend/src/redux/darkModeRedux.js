import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: localStorage.getItem("darkMode") || false,

};

export const darkModeSlice = createSlice({
  name: "darkmode",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("darkMode",state.darkMode) 
    },

    
  },
});

// Action creators are generated for each case reducer function
export const { toggleDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
