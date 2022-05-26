import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'isLogged',
  initialState: {
    value: false,
  },
  reducers: {
    setFalse: (state) => {
      state.value = false;
    },
    setTrue: (state) => {
      state.value = true;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setFalse, setTrue } = userSlice.actions
export default userSlice.reducer