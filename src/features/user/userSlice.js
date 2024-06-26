import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [
    { id: null, name: 'All users'},
    { id: 6, name: 'Emil Olsson' },
    { id: 5, name: 'Jerry Olsson' },
    { id: 1, name: 'Moa Sandberg' },
    { id: 2, name: 'Alicia Karlsson' },
    { id: 3, name: 'Paulina Kattilavaara' },
    { id: 4, name: 'Viktor Magnusson' },
  ],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export const {} = userSlice.actions;

export default userSlice.reducer;
