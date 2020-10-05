import React, { Suspense } from 'react'
import PublicRoutes from './PublicRoutes'
import PrivateRoutes from './PrivateRoutes';
import { Spinner } from 'react-bootstrap'
import { Switch } from 'react-router-dom'
import { SignUp } from '../views/signup'
import { Home } from '../views/home'
import { DefaultLayout, AuthLayout } from '../layouts'
import { SignIn } from '../views/signin'
import { ConfirmRegistration } from '../views/confirmregistration'
import { CompleteRegistration } from '../views/completeregistration'
import { Verification } from '../views/verification'
import { Dashboard } from '../views/dashboard'
import UserLayout from '../layouts/UserLayout';
import { LogOut } from '../views/logout';
import { BookAppointment } from '../views/bookappointment';
import { Appointments } from '../views/donations';
import { Requests } from '../views/requests';
import { Appointment } from '../views/donation';
import { Donates } from '../views/donate';
import { Profile } from '../views/profile';
import { BookRequest } from '../views/bookrequest';
import { Request } from '../views/request';
import { AcceptRequest } from '../views/acceptrequest';

const Routes = () => {
	return (
		<Suspense fallback={Spinner}>
			<Switch>
				<PublicRoutes exact={true} layout={AuthLayout} path="/signup" component={SignUp}/>
				<PublicRoutes exact={true} layout={AuthLayout} path="/signin" component={SignIn}/>
				<PublicRoutes exact={true} layout={AuthLayout} path="/confirmregistration" component={ConfirmRegistration}/>
				<PublicRoutes exact={true} layout={AuthLayout} path="/completeregistration" component={CompleteRegistration}/>
				<PublicRoutes exact={true} layout={AuthLayout} path="/verification/:code" component={Verification}/>
				<PublicRoutes exact={true} layout={DefaultLayout} path="/" component={Home}/>
        <PrivateRoutes exact={true} layout={UserLayout} path="/dashboard" component={Dashboard}/>
        <PrivateRoutes exact={true} layout={UserLayout} path="/donation" component={Donates}/>
        <PrivateRoutes exact={true} layout={UserLayout} path="/donation/book" component={BookAppointment}/>
        <PrivateRoutes exact={true} layout={UserLayout} path="/donation/history" component={Appointments}/>
        <PrivateRoutes exact={true} layout={UserLayout} path="/donation/:appointmentId" component={Appointment}/>
				<PrivateRoutes exact={true} layout={UserLayout} path="/requests" component={Requests}/>
				<PrivateRoutes exact={true} layout={UserLayout} path="/requests/book" component={BookRequest}/>
				<PrivateRoutes exact={true} layout={UserLayout} path="/requests/accept/:requestId" component={AcceptRequest}/>
				<PrivateRoutes exact={true} layout={UserLayout} path="/requests/:requestId" component={Request}/>
        <PrivateRoutes exact={true} layout={UserLayout} path="/profile" component={Profile}/>
        <PrivateRoutes exact={true} layout={UserLayout} path="/logout" component={LogOut}/>
			</Switch>
		</Suspense>
	)
}

export default Routes

// Donate now
// -------------
// show all individauls that requested and matches user blood group
// if no individual or too far then book appointment to put in bank


// request
// -------------
// show all banks that matches the user blood group
// if no matches in bank or too far then put to public for donor help

// appoint
// ----------
// type: bank/receiver

// req
// ----------
// id
// receiver
// donor
// bloodGroup
// hospital
// appointment
// comment: urgent
// status: open/closed
// createdAt
// updatedAt
