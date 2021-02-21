
import Lookup from './components/Lookups';
import Firm from './components/Firm';

var routes = [
  {
    path: "/lookup",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Lookup,
    layout: "/admin"
  },
  {
    path: "/firm",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Firm,
    layout: "/admin"
  },
];
export default routes;
