import React, { useState } from "react";
import { Card } from "../../styleComponents";
import Sidebar from "./Sidebar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

const Warehouse = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <React.Fragment>
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
          <Sidebar />
          <div className="col-md-9 col-xl-10">
            <Card className="mt-4">
              <h1>Warehouse Content</h1>
              <ul>
                <li>Some</li>
                <li>Content</li>
              </ul>
            </Card>
            <Card className="mt-4">
              <h1>Warehouse Content</h1>
              <ul>
                <li>Some</li>
                <li>Content</li>
              </ul>
            </Card>
            <Card className="mt-4">
              <h1>Warehouse Content</h1>
              <ul>
                <li>Some</li>
                <li>Content</li>
              </ul>
            </Card>
            <Card className="mt-4">
              <h1>Warehouse Content</h1>
              <ul>
                <li>Some</li>
                <li>Content</li>
              </ul>
            </Card>
            <Card className="mt-4">
              <h1>Warehouse Content</h1>
              <ul>
                <li>Some</li>
                <li>Content</li>
              </ul>
            </Card>
            <Card className="mt-4">
              <h1>Warehouse Content</h1>
              <ul>
                <li>Some</li>
                <li>Content</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Warehouse;
