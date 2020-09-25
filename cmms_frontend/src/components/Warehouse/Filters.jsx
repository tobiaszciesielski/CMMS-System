import React from "react";

// icons
import "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faSearch,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

const Filters = () => {
  return (
    <React.Fragment>
      <button
        className="btn sidebar-category mt-3 nav-link h5 px-0"
        data-toggle="collapse"
        data-target="#filters"
        type="button"
        aria-expanded="false"
        aria-controls="filters"
      >
        <h5>
          <FontAwesomeIcon icon={faFilter} className="mr-2" />
          Filter
          <FontAwesomeIcon icon={faCaretDown} className="ml-2" />
        </h5>
      </button>
      <div className="collapse" id="filters">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/warehouse" className="nav-link sidebar-subcategory">
              Sub Filter
            </Link>
          </li>
        </ul>
        <div className="sidebar-category mt-3 nav-link h5">
          <button className="btn btn-primary btn-block">
            <FontAwesomeIcon icon={faSearch} className="mr-2" />
            Search
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Filters;
