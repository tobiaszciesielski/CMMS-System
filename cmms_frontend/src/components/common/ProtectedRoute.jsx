import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

const ProtectedRoute = ({
  redirect,
  component: Component,
  render,
  privilegedRoles,
  ...rest
}) => {
  const {user, isAuthenticated} = useAuth()
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated() || !privilegedRoles.includes(user.role)) return <Redirect to={redirect} />;
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
