import React from "react";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { SideBar, TopBar } from "../components";
import NotificationBar from "../components/NotificationBar";
import './userlayout.css'
import 'react-toastify/dist/ReactToastify.css';

const UserLayout = ({ children }) => {

  const { show } = useSelector(state => state.sidebar)

  toast.configure();

  return (
    <div className="wrapper">
      <div className={show?"sidebar show":"sidebar"}>
        <SideBar/>
      </div>
      <div className="main-panel">
        <TopBar/>
        <NotificationBar/>
        <div style={{ minHeight: "100vh" }}>{children}</div>
      </div>
    </div>
  );
};

export default UserLayout;
