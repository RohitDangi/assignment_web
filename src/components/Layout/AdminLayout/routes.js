import Dashboard  from "../../../components/Dashboard";

import User  from "../../../components/Service";
import UserAdd  from "../../../components/ServiceAdd";

const routes = [
  { path: '/users', exact:true, name: 'User', component: User },
  { path: '/addUser', exact:true, name: 'UserAdd', component: UserAdd },
  { path: '/editUser/:id', exact:true, name: 'UserAdd', component: UserAdd },
  { path: '/dashboard',  name: 'Dashboard', component: Dashboard },

];

export default routes;
