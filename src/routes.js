/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import WifiIcon from '@material-ui/icons/Wifi';
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";

// core components/views for Admin layout
import ClientNetwork from './component/ClientNetwork';
import AccessPoint from './component/AccessPoint';
import Switch from './component/Switch';
import Camera from './component/Camera';
import VideocamIcon from '@material-ui/icons/Videocam';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import TongQuan from './component/TongQuan';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";

const dashboardRoutes = [
  
  {
    path: "/clientnetwork",
    name: "Client Network",
    rtlName: "لوحة القيادة",
    icon: Person,
    component: ClientNetwork,
    layout: "/admin"
  },
  {
    path: "/camera",
    name: "Camera",
    rtlName: "لوحة القيادة",
    icon: VideocamIcon,
    component: Camera,
    layout: "/admin"
  },
  {
    path: "/switch",
    name: "Switch",
    rtlName: "قائمة الجدول",
    icon: SettingsInputComponentIcon,
    component:Switch ,
    layout: "/admin"
  },
  {
    path: "/wireless",
    name: "Wireless",
    rtlName: "طباعة",
    icon: WifiIcon,
    component: AccessPoint,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "Summary",
    rtlName: "لوحة القيادة",
    icon: WorkOutlineIcon,
    component: UserProfile,
    layout: "/admin"
  },

];

export default dashboardRoutes;
