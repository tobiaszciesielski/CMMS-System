import React, { useEffect, useState } from "react";

import Categories from "./Categories";

// icons
import "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTools } from "@fortawesome/free-solid-svg-icons";

import { useRouteMatch, useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import Filters from "./Filters";

const Sidebar = ({isFetching, categories}) => {
  const { user } = useAuth();
  let { url } = useRouteMatch();
  const history = useHistory();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        const ismobile = window.innerWidth < 768;
        if (ismobile !== isMobile) setIsMobile(ismobile);
      },
      false
    );
  }, [isMobile]);

  return (
    <nav
      id="sidebar"
      className={
        "col-md-3 col-xl-2 bg-dark sidebar collapse pb-3" +
        `${isMobile ? "" : " show"}`
      }
      aria-expanded={false}
    >
      {user.role === "admin" && (
        <button
          onClick={() => history.push(`${url}/admin`)}
          className="btn btn-block btn-outline-warning d-inline mt-3"
        >
          <h5 className="pt-1">
            Edit
            <FontAwesomeIcon icon={faTools} className="ml-2" />
          </h5>
        </button>
      )}
      <Categories isFetching={isFetching} categories={categories}/>
      <Filters />
    </nav>
  );
};

export default Sidebar;
