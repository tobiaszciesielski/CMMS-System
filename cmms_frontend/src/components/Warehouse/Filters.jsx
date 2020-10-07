import React, { useState } from "react";

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
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <React.Fragment>
      <button
        className="btn sidebar-category nav-link py-1"
        data-toggle="collapse"
        data-target="#filters"
        type="button"
        aria-expanded="false"
        aria-controls="filters"
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
      >
        <h5>
          <FontAwesomeIcon icon={faFilter} className="mr-2" />
          Filter
          <FontAwesomeIcon icon={faCaretDown} className="ml-2 pt-1" />
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
        <div className="sidebar-category nav-link h5">
          <button className="btn btn-primary btn-block search-btn">
            <FontAwesomeIcon icon={faSearch} className="mr-2" />
            Search
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Filters;
