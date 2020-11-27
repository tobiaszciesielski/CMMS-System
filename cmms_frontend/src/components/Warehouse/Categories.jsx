import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClone } from "@fortawesome/free-regular-svg-icons";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

const Categories = ({isFetching, categories}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const [categoryTree, setCategoryTree] = useState(categories);
  const [isLoading, setIsLoading] = useState(isFetching);

  useEffect(() => {
    setCategoryTree(categories);
    console.log(categories)
  }, [isFetching]);

  return (
    <React.Fragment>
      <button
        className="btn sidebar-category nav-link text-nowrap py-2 mt-2"
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
          Categories
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
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Categories;
