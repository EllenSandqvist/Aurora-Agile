import { createSlice, nanoid } from '@reduxjs/toolkit';

// const initialState = {
//   columns: [
//     {
//       id: 1,
//       title: 'Todo',
//     },
//     {
//       id: 2,
//       title: 'Doing',
//     },
//     {
//       id: 3,
//       title: 'Done',
//     },
//   ],
// };

const getInitialColumns = () => {
  const storedColumns = JSON.parse(localStorage.getItem('columns'));
  if (storedColumns) {
    return storedColumns;
  } else {
    const defaultColumns = [
      {
        id: 1,
        title: 'Todo',
      },
      {
        id: 2,
        title: 'Doing',
      },
      {
        id: 3,
        title: 'Done',
      },
    ];
    localStorage.setItem('columns', JSON.stringify(defaultColumns));
    return defaultColumns;
  }
};

const initialState = {
  columns: getInitialColumns(),
};

const saveColumnsToLocal = (columnList) =>
  localStorage.setItem('columns', JSON.stringify(columnList));

export const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    addColumn: (state) => {
      state.columns.push({
        id: nanoid(),
        title: `new Column`,
      });
      saveColumnsToLocal(state.columns);
    },
    removeColumn: (state, action) => {
      const columnToRemove = action.payload;
      state.columns = state.columns.filter(
        (col) => col.id !== columnToRemove.id
      );
      saveColumnsToLocal(state.columns);
    },
    moveColumn: (state, action) => {},
    editColumn: (state, action) => {
      const { currentColumn, newTitle } = action.payload;
      console.log('Change title from: ', currentColumn.title, 'to', newTitle);
      const columnToUpdate = state.columns.find(
        (col) => col.id === currentColumn.id
      );
      if (columnToUpdate) {
        columnToUpdate.title = newTitle;
      }
      saveColumnsToLocal(state.columns);
    },
  },
});

export const { addColumn, removeColumn, editColumn } = columnSlice.actions;

export default columnSlice.reducer;
