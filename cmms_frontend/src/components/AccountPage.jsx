import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Card } from "./../styleComponents";

const AccountPage = () => {
  const { user, token } = useAuth();
  return (
    <div className="container">
      <Card className="text-break text-center mt-4 mx-auto">
        <h3>Your JSON Web Token is:</h3>
        <p>{`${token}`}</p>
        <h3>Your role is:</h3>
        <p>{`${user.role}`}</p>
        <h3>Your email is:</h3>
        <p>{`${user.email}`}</p>
        <h3>Your full name is:</h3>
        <p>{`${user.firstName} ${user.lastName}`}</p>
      </Card>
    </div>
  );
};

export default AccountPage;
