import React from "react";

import Dashboard from "./Dashboard"
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import WarehouseAdminPanel from "./AdminPanel";

const Warehouse = () => {
  let { path } = useRouteMatch();
  
  return (
    <Switch>
      <Route
        exact
        path={`${path}/admin`}
        component={WarehouseAdminPanel}
      />
      <Route
        path={`${path}`}
        component={Dashboard}
      />
    </Switch>
  );
};

export default Warehouse;
