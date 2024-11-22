/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";

import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import LoginReal from "components/Login";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/events",
    name: "Events",//events
    icon: "fas fa-umbrella-beach text-blue", 
    component: <Icons />,
    layout: "/admin",
  },
  {
    path: "/matching-profile",
    name: "Matching profile",
    icon: "fas fa-users text-orange", 
    component: <Maps />,
    layout: "/admin",
  },
  {
    path: "/profile",
    name: "Your Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/chats",
    name: "Messages",
   icon: "fas fa-comments text-red",
    component: <Tables />,
    layout: "/admin",
  },
  
  {
    path: "register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
  },
  
];
export default routes;
