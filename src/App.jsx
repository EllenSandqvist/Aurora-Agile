//Komponenter
import Board from './components/Board';
import Header from './components/Header';
import Footer from './components/Footer';
import List from './components/List';
import MissingPage from './components/MissingPage';

import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);

  // State For Selecting Task
  const [selectedTask, setSelectedTask] = useState(null);

  // Function To Choose The Selected Task
  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  return (
    <div id='appContainer'>
      <Router>
        <DndProvider backend={HTML5Backend}>
          <Header
            user={user}
            setUser={setUser}
          />
          <Routes>
            <Route
              index
              element={
                <Board
                  selectedTask={selectedTask}
                  setSelectedTask={setSelectedTask}
                  handleTaskClick={handleTaskClick}
                  user={user}
                />
              }
            />
            <Route
              path='/list'
              element={
                <List
                  selectedTask={selectedTask}
                  setSelectedTask={setSelectedTask}
                  handleTaskClick={handleTaskClick}
                />
              }
            />
            <Route
              path='*'
              element={<MissingPage />}
            />
          </Routes>
          <Footer />
        </DndProvider>
      </Router>
    </div>
  );
}

export default App;
