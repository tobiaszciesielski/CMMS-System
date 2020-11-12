import React from "react";
import { Card } from "../styleComponents";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIndustry,
  faChartBar,
  faWarehouse,
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const history = useHistory();

  const redirect = (modulePath) => {
    let path = `${modulePath}`;
    history.push(path);
  };

  return (
    <div className="container">
      <Card className="row mt-4 text-break text-center mx-auto">
        <div className="col-lg">
          <h1 className="text-primary">Welcome to CMMS</h1>
          <h5>
            Take a quick overwiew on the dashboard of Gestamp Computerised
            Maintenance Management System.
          </h5>
        </div>
      </Card>
      <Card className="mt-3 text-center">
        <div className="row">
          <div className="col-lg h2">
            <h2 className="text-primary">Module selection</h2>
            <h5>Choose module you want to work with.</h5>
          </div>
        </div>
        <div className="row mx-auto text-center h3">
          <div className="col-sm my-2">
            <button
              className="btn btn-lg btn-block btn-outline-primary"
              disabled={true}
            >
              <FontAwesomeIcon className="h1" icon={faChartBar} />
              <h4>Raports</h4>
            </button>
          </div>
          <div className="col-sm my-2">
            <button
              onClick={() => redirect("/warehouse")}
              className="btn btn-lg btn-block btn-outline-primary"
            >
              <FontAwesomeIcon className="h1" icon={faWarehouse} />
              <h4>Warehouse</h4>
            </button>
          </div>
          <div className="col-sm my-2">
            <button
              className="btn btn-lg btn-block btn-outline-primary"
              disabled={true}
            >
              <FontAwesomeIcon className="h1" icon={faIndustry} />
              <h4>Maintnance Planning</h4>
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;

