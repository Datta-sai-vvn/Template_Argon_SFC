import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import MatchingProfile from "views/examples/MatchingProfile.js";
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
    name: "Events",
    icon: "fas fa-umbrella-beach text-blue",
    component: <Icons />,
    layout: "/admin",
  },
  {
    path: "/matching-profile",
    name: "Matching profile",
    icon: "fas fa-users text-orange",
    component: <MatchingProfile />,
    layout: "/admin",
  },
  {
    path: "/profile",
    name: "My Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/chats/:uid",
    name: "Messages",
    icon: "fas fa-comments text-red",
    component: <Tables />,
    layout: "/admin",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
  },
];

export default routes;
