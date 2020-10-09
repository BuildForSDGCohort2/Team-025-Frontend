import React, { Suspense } from 'react'
import PublicRoutes from './PublicRoutes'
import PrivateRoutes from './PrivateRoutes';
import { Spinner } from 'react-bootstrap'
import { Switch } from 'react-router-dom'
import { SignUp } from '../views/signup'
import { Home } from '../views/home'
import { DefaultLayout, AuthLayout, HospitalLayout } from '../layouts'
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
import HospitalPrivateRoutes from './HospitalPrivateRoutes';
import { HospitalDashboard } from '../views/hospitaldashboard';
import { Contactus } from "../views/contactus";
import { Faq } from "../views/faq";
import { About } from '../views/about';

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
        <PublicRoutes exact={true} layout={DefaultLayout} path="/contactus" component={Contactus} />
        <PublicRoutes exact={true} layout={DefaultLayout} path="/faq" component={Faq} />
        <PublicRoutes exact={true} layout={DefaultLayout} path="/about" component={About} />

        <HospitalPrivateRoutes exact={true} layout={HospitalLayout} path="/h/dashboard" component={HospitalDashboard}/>
			</Switch>
		</Suspense>
	)
}

export default Routes;
