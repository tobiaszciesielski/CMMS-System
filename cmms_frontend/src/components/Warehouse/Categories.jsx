import React from "react";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClone } from "@fortawesome/free-regular-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const Categories = () => {
  return (
    <React.Fragment>
      <button
        className="btn sidebar-category mt-3 nav-link h5 text-nowrap px-0"
        data-toggle="collapse"
        data-target="#categories"
        type="button"
        aria-expanded="false"
        aria-controls="categories"
      >
        <h5>
          <FontAwesomeIcon icon={faClone} className="mr-2" />
          Categories
          <FontAwesomeIcon icon={faCaretDown} className="ml-2" />
        </h5>
      </button>
      <div className="collapse" id="categories">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/warehouse" className="nav-link sidebar-subcategory">
              Sub Category
            </Link>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Categories;
