import React, {useState, useEffect} from 'react';
import { Card } from "../../styleComponents";
import { CircularProgress } from '@material-ui/core/'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

import Sidebar from "./Sidebar";
import ItemList from './ItemList';

const Dashboard = ({isFetching, categories, items}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(isFetching);

  useEffect(() => {
    setIsLoading(isFetching);
  }, [isFetching]); 

  return <React.Fragment>
      <div
        id="sidebar-toggler"
        className="d-md-none collapsed bg-dark py-2 text-center"
        data-toggle="collapse"
        data-target="#sidebar"
        type="button"
        aria-expanded="false"
        aria-controls="sidebar"
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
      >
        <h5>
          Categories & Filters
          <FontAwesomeIcon
            icon={isExpanded ? faCaretUp : faCaretDown}
            className="ml-1 pt-1"
          ></FontAwesomeIcon>
        </h5>
      </div>
      <div className="container-fluid">
        <div className="row warehouse-wrapper">
          <Sidebar isFetching={isFetching} categories={categories}/>
            <div className="col-md-9 col-xl-10">
            {isLoading 
              ? <div className= "d-flex flex-column justify-content-center align-items-center h-100"><CircularProgress color="inherit"/></div>
              : <ItemList items={items}/>}
          </div>
        </div>
      </div>
  </React.Fragment>
}
 
export default Dashboard;