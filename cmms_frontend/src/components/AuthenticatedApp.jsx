import React from "react";

// Routing
import { Switch, Route, Redirect } from "react-router-dom";

// Components
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import AccountPage from "./AccountPage";
import HelpPage from "./HelpPage";
import Warehouse from "./Warehouse/Warehouse";
import WarehouseAdminPanel from "./Warehouse/AdminPanel";

const AuthenticatedApp = () => {
  return (
    <div id="app" style={{ paddingTop: "59px", height: "100%" }}>
      <Navbar />
      <Switch>
        <Route
          exact
          path={`/warehouse/admin`}
          component={WarehouseAdminPanel}
        />
        <Route exact path="/warehouse" component={Warehouse} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/account" component={AccountPage} />
        <Route path="/help" component={HelpPage} />
        <Redirect from="*" to="/dashboard" />
      </Switch>
    </div>
  );
};

export default AuthenticatedApp;
