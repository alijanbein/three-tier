import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHi,faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../context/authContext';
const Header = () => {
    const auth = useContext(AuthContext)
  return (
    <div className='header'>
       
         <a>
            <span className="icon">
            👋
            </span>
            <span className="title">Hi {auth.username}</span>
          </a>
         <a style={{cursor:"pointer"}} onClick={() => auth.logout()}>
            <span className="icon">
            <FontAwesomeIcon icon={faSignOutAlt} />
            </span>
            <span className="title">Logout</span>
          </a>

    </div>
  )
}

export default Header