import React from "react";

import Categories from "./Categories";

// icons
import "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTools } from "@fortawesome/free-solid-svg-icons";

import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import Filters from './Filters';

const Sidebar = () => {
  const { user } = useAuth();
  let { url } = useRouteMatch();
  const history = useHistory();

  return (
    <nav id="sidebar" className="col-md-3 col-lg-2 bg-dark d-md-block sidebar h" aria-expanded={false}> 
      {user.role === "admin" && (
        <button
          onClick={() => history.push(`${url}/admin`)}
          className="btn btn-block btn-outline-warning d-inline mt-3 "
        >
          <h5 className="mx-0">
            Edit
            <FontAwesomeIcon icon={faTools} className="ml-2" />
          </h5>
        </button>
      )}
      <Categories />

      <Filters />
    </nav>
  );
};

export default Sidebar;
