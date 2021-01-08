import React from 'react';
import {useHistory} from 'react-router-dom'
import { ExitButton as Exit } from './../../styleComponents';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const ExitButton = () => {
  const history = useHistory()
  return <div className="text-left mb-2 m-md-0">
    <Exit className="btn btn-outline-danger" onClick={() => {history.goBack()}
    }>
      Exit
      <FontAwesomeIcon className="ml-2" icon={faSignOutAlt}/>
    </Exit>
  </div> 
}
 
export default ExitButton;
