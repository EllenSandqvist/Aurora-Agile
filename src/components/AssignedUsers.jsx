//Denna komponent visar vilka users som är valda till tasken
import { useSelector } from 'react-redux';
import { useContext, useEffect, useState } from 'react';
import MultiSelectDropDown from './MultiSelectDropDown';

// Bootstrap:
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import DataContext from '../context/DataContext';

const AssignedUsers = ({ task, show }) => {
  const users = useSelector((state) => state.user.users);
  const [selected_users, set_Selected_users] = useState([]);
  const { setAssignedToSave } = useContext(DataContext);

  useEffect(() => {
    set_Selected_users(
      task.assignedTo.map((id) => users.find((user) => id == user.id))
    );
    setAssignedToSave(task.assignedTo);
  }, [task]);

  return (
    <div className='assigned'>
      {/* assigned to är vilka som är assigned på aktuellt task.
  den visar max 3 cirklar. den visar första bokstaven i för- och efternamn.
  vid mer än ett efternamn syns bara första. */}
      {selected_users.map(
        (person, index) =>
          index < 3 && (
            <div key={index}>
              <OverlayTrigger
                overlay={
                  <Tooltip>
                    {' '}
                    {users.find((u) => u.id === person.id).name}
                  </Tooltip>
                }
              >
                <div
                  className={`me-1 rounded-circle text-bg-aurora-secondary opacity-${100 - index * 25} circle`}
                >
                  {selected_users.length > 0 && (
                    <span key={index}>
                      {users
                        .find((u) => u.id === person.id)
                        .name.split(' ')
                        .map((name, i) => i < 2 && name.charAt(0))}
                    </span>
                  )}
                </div>
              </OverlayTrigger>
            </div>
          )
      )}

      {/* om det finns fler än 3 assignade till uppgiften så visas (...) */}
      {selected_users.length > 3 && (
        <OverlayTrigger
          overlay={
            <Tooltip>
              {selected_users.map((person, i) => (
                <span key={i}>
                  {users.find((u) => u.id === person.id).name}
                  <br />
                </span>
              ))}
            </Tooltip>
          }
        >
          <div className='rounded-circle border bg-light circle'>...</div>
        </OverlayTrigger>
      )}

      {show && (
        <MultiSelectDropDown
          task={task}
          users={users}
          selected_users={selected_users}
          set_Selected_users={set_Selected_users}
        />
      )}
    </div>
  );
};

export default AssignedUsers;
