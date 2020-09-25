import React from "react";
import { Card } from "../../styleComponents";
import Sidebar from "./Sidebar";

const Warehouse = () => {
  return (
    <div className="container-fluid h-100">
      <button
        className="btn btn-block d-md-none collapsed"
        data-toggle="collapse"
        data-target="#sidebar"
        type="button"
        aria-expanded="false"
        aria-controls="sidebar"
      >
        Toggler
      </button>
      <div className="row h-100">
        <Sidebar />
        <div className="col-md-9 col-lg-10 mt-3">
          <Card className="mt-3">
            <h1>Warehouse Content</h1>
            <ul>
              <li>Some</li>
              <li>Content</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Warehouse;
