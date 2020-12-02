import React, { useState } from 'react';

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClone } from "@fortawesome/free-regular-svg-icons";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

const Menu = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return <div>
      <button
        className="btn sidebar-category nav-link text-nowrap py-2"
        data-toggle="collapse"
        data-target="#categories"
        type="button"
        aria-expanded="false"
        aria-controls="categories"
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
      >
        <h5>
          <FontAwesomeIcon icon={faClone} className="mr-2" />
            SomeCategory
          <FontAwesomeIcon
            icon={isExpanded ? faCaretUp : faCaretDown}
            className="ml-2 pt-1"
          />
        </h5>
      </button>
      <div className="collapse" id="categories">
        <ul className="nav flex-column mb-3">
          <li className="nav-item">
            <Link to="/warehouse" className="nav-link sidebar-subcategory">
              Sub Category
            </Link>
          </li>
          <li>
            {props.children}
          </li>
        </ul>
      </div>
  </div>;
}
 
export default Menu;