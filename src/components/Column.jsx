//Här är kolumnkomponenten
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Slices
import { moveTask } from '../features/task/taskSlice';
import { removeColumn, editColumn } from '../features/column/columnSlice';

//Components
import Task from './Task';
import DeleteColumn from './DeleteColumn';

//  React-dnd
import { useDrop } from 'react-dnd';

//Bootstrap
import Alert from 'react-bootstrap/Alert';

const column = ({ currentColumn, columnId, user, handleTaskClick }) => {
  const [columnTitle, setColumnTitle] = useState(currentColumn.title);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const tasks = useSelector((state) => state.task.tasks);

  const columns = useSelector((state) => state.column.columns);
  const dispatch = useDispatch();

  // DROP - React-dnd
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'task',
    drop: (task) => moveTaskHandler(task.id, columnId),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const moveTaskHandler = (taskId, newColumnId) => {
    const newData = {
      taskId: taskId,
      newColumnId: newColumnId,
    };

    dispatch(moveTask(newData));
  };

  const removeColumnHandler = () => {
    setShowDeletePopup(true);
  };

  const confirmDeleteColumn = () => {
    const moveTasks = tasks.filter((task) => task.columnId == columnId);
    moveTasks.map((task) =>
      dispatch(moveTask({ taskId: task.id, newColumnId: 1 }))
    );
    dispatch(removeColumn(currentColumn));
    setShowDeletePopup(false);
  };

  const cancelDeleteColumn = () => {
    setShowDeletePopup(false);
  };

  const editColumnHandler = () => {
    const editedColumn = {
      currentColumn: currentColumn,
      newTitle: columnTitle,
    };
    dispatch(editColumn(editedColumn));
  };

  return (
    <>
      {/* CONTAINER */}
      <div
        id='columnHolder'
        className='mx-2'
        style={{
          width: '19rem',
        }}
        ref={drop}
      >
        {/* COLUMN HEADER */}
        <div
          className='columnHeader h5 container d-flex justify-content-around rounded-1 py-1 text-bg-aurora-primary '
          style={{
            marginLeft: '0',
          }}
        >
          <input
            className='input-reset'
            spellCheck='false'
            type='text'
            value={columnTitle}
            onChange={(e) => setColumnTitle(e.target.value)}
            onBlur={() => editColumnHandler()}
          ></input>
          {columns[0] !== currentColumn && (
            <DeleteColumn onClick={() => removeColumnHandler()} />
          )}
        </div>

        {/* TASKS HOLDER */}
        <div
          id='column'
          className={
            'card border-0 container py-2 flex-grow-1 ' +
            (isOver ? 'shadow-lg' : 'shadow-sm')
          }
        >
          {/* if user is unset then map all of the tasks */}
          {user == null
            ? tasks.map((t) => {
                /* WE R MAPPING THE TASK ONLY BELONGING TO THIS CURRNT COLUMN. */
                if (t.columnId == currentColumn.id) {
                  return (
                    <Task
                      key={t.id}
                      task={t}
                      onTaskClick={handleTaskClick}
                    />
                  );
                }
              })
            : // else user want to filter by person we search trough the tasks and show them only if the user is assigned to the task
              tasks.map((t) => {
                if (t.assignedTo.includes(user)) {
                  /* WE R MAPPING THE TASK ONLY BELONGING TO THIS CURRNT COLUMN. */
                  if (t.columnId == currentColumn.id) {
                    return (
                      <Task
                        key={t.id}
                        task={t}
                        onTaskClick={handleTaskClick}
                      />
                    );
                  }
                }
              })}
        </div>
      </div>
      {showDeletePopup && (
        <div
          style={{
            position: 'absolute',
            zIndex: '100',
            transform: 'translate(-50%, -50%)',
            top: '50%',
            left: '50%',
          }}
        >
          <Alert
            variant='warning'
            className='delete-popup'
          >
            <Alert.Heading>
              Are you sure you want to delete the "{currentColumn.title}"
              column?
              <p style={{ fontSize: '15px', marginTop: '1em', color: 'red' }}>
                Tasks will be moved to the first column
              </p>
            </Alert.Heading>
            <hr />
            <button
              onClick={confirmDeleteColumn}
              className='btn btn-danger rounded-pill'
              style={{ marginRight: '0.5em' }}
            >
              Yes
            </button>
            <button
              onClick={cancelDeleteColumn}
              className='btn btn-warning rounded-pill'
            >
              No
            </button>
          </Alert>
        </div>
      )}
    </>
  );
};

export default column;
