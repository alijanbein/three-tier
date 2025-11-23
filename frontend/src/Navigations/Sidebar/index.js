import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars,faUser,faPlus,faSignOutAlt   } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../../context/authContext"
const Sidebar = () => {
    const [isActive,setIsActive] = useState(false);
    const togglehandler = () => {
        setIsActive(state => !state)
    }
    const auth = useContext(AuthContext)
  return (
    <nav className={isActive ? "active" : ""}>
      <ul>
        <li>
          <a className="toggle" >
            <span className="icon" onClick={togglehandler}>
              <FontAwesomeIcon icon={faBars} />
            </span>
            <span className="title">Menu</span>
          </a>
        </li>

        <li>
          <a href="/">
            <span className="icon">
            <FontAwesomeIcon icon={faUser} />

            </span>
            <span className="title">Profile</span>
          </a>
        </li>
        <li>
          <a href="/add_task">
            <span className="icon">
            <FontAwesomeIcon icon={faPlus} />
            </span>
            <span className="title">Add Task</span>
          </a>
        </li>
        <li onClick={() => auth.logout()}>
          <a >
            <span className="icon">
            <FontAwesomeIcon icon={faSignOutAlt} />
            </span>
            <span className="title">Logout</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
