import Route from "../views/route.vue";
import Walking from "../views/walking.vue";
import finishedWalk from "../views/finishedWalk.vue";

const routes = [
  {
    path: "/wandelapp/",
    redirect: "/wandelapp/login",
    component: () => import("../views/login.vue"),
  },
  {
    path: "/wandelapp/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/wandelapp/",
    name: "mainRoutes",
    component: () => import("../components/MainRoutes.vue"),
    children: [
      {
        path: "/wandelapp/home/",
        name: "home",
        component: () => import("../views/Home.vue"),
      },
      {
        path: "/wandelapp/route/",
        name: "route",
        component: Route,
      },
      {
        path: "/wandelapp/:name/wandelingen/",
        name: "myWalks",
        component: () => import("../views/myWalks.vue"),
      },
      {
        path: "/wandelapp/:name/wandelingen/aanmaken/",
        name: "createWalk",
        component: () => import("../views/createWalk.vue"),
      },
      {
        path: "/wandelapp/profile/:name/:uid/",
        name: "profile",
        component: () => import("../views/profile.vue"),
      },
      {
        path: "/wandelapp/:name/wandelingen/:wandelingID/",
        name: "createdWalk",
        component: () => import("../views/createdWalk.vue"),
      },
      {
        path: "/wandelapp/walks/",
        name: "walks",
        component: () => import("../views/walks.vue"),
      },
      {
        path: "/wandelapp/wandelingen/:wandelingID/walking",
        name: "walking",
        component: Walking,
      },
      {
        path: "/wandelapp/:wandelingID/finished",
        name: "finished",
        component: finishedWalk,
      },
    ],
  },
];

export default routes;
