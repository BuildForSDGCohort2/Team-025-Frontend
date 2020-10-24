import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const AdminPrivateRoutes = ({ component: Component, layout: Layout, ...rest }) => {
  const { isAuthenticated, user, role } = useSelector((state) => state.auth);

  const toRender = (props) => {
    return (
      <>
        {isAuthenticated && user && role === "admin" ? (
          <Layout>
            {user && !user.phone ? <Redirect to="/completeregistration" /> : null}
            {user && !user.emailVerifiedAt ? <Redirect to="/confirmregistration" /> : null}
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect to="/signin" />
        )}
      </>
    );
  };

  return <Route {...rest} render={toRender} />;
};

export default AdminPrivateRoutes;
