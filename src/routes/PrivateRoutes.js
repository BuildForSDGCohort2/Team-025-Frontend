import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoutes = ({ component: Component, layout:Layout, ...rest }) => {

  const { isAuthenticated, user, role } = useSelector(state => state.auth);

	const toRender = (props) =>{

    return(
      <>
        {isAuthenticated && user && (role === 'user')?(
          <Layout>
            {user && !user.phone?(
              <Redirect to="/completeregistration"/>
            ):null}
            {user && !user.emailVerifiedAt?(
              <Redirect to="/confirmregistration"/>
            ):null}
            <Component {...props}/>
          </Layout>
        ):(
          <Redirect to="/signin"/>
        )}
      </>
    )
  }

	return (
		<Route
			{...rest}
			render={toRender}
		/>
	)
}

export default PrivateRoutes
