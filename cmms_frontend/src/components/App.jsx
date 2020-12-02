import React from "react";

import AuthenticatedApp from "./AuthenticatedApp";
import UnauthenticatedApp from "./UnauthenticatedApp";
import { useAuth } from "../context/AuthProvider";

const App = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated() 
    ? <AuthenticatedApp /> 
    : <UnauthenticatedApp />; 
};

export default App;
