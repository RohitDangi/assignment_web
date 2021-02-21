import React, { Component } from "react";
import { HashRouter, Route, Switch , Redirect} from "react-router-dom";
import './App.scss';
import "./scripts";
// import './App.css';
import './assets/css/codebase.min.css'
import Cookies from 'universal-cookie';
import appConstants from "./config/AppConstants";

import Login  from "./components/Common/Login";
import Signup  from "./components/Common/Signup";

import AdminLayout  from "./components/Layout/AdminLayout";
import firebase from 'firebase';

const cookie = new Cookies();

const loading = () => (
  null
);
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      token: "",
      loginType: ""
    }
  }

  componentWillMount() {
   
    const sessionUser = cookie.get('user', { path: '/' }),
      jwtSession = cookie.get('token', { path: '/' }),
      loginType = parseFloat(cookie.get('loginType', { path: '/' }));
    this.setState({
      user: sessionUser || null,
      token: jwtSession || null,
      loginType: loginType || null
    })

  }
  render() {
    let { user , loginType,token} = this.state;
    let role = (user && user.role && user.role.name) || ""
    return (
      <HashRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            {/* <Route exact path="/group/add" component={GroupAdd} /> */}
            {/* <Route exact path="/dashboard" component={Dashboard} /> */}
            {/* <Route exact path="/group" component={GroupList} />
            <Route exact path="/group/add" component={GroupAdd} />
            <Route exact path="/exchange" component={ExchangeList} />
            <Route exact path="/exchange/add" component={ExchangeAdd} />
            <Route exact path="/brockeragemaster" component={BrockerageMasterList} />
            <Route exact path="/brockeragemaster/add" component={BrockerageMasterAdd} />
            <Route exact path="/party" component={PartyList} />
            <Route exact path="/party/add" component={PartyAdd} /> */}

            <Route
              path="/"
              // exact={true}
              render={props =>
                this.state.token != null ? (
                  <div>
                    {
                       <AdminLayout {...props}></AdminLayout> 
                      // (loginType == appConstants.loginType.STUDENT ||loginType == appConstants.loginType.FACULTY || role === appConstants.ROLES.trainer.name || role === appConstants.ROLES.evaluator.name || role === appConstants.ROLES.counsellor.name) 
                      // ? <StudentLayout {...props}></StudentLayout> 
                      // :null
                    }
                  </div>
                ) : (
                      // <Layout {...props}></Layout>
                      <Redirect to={"/login"} />
                  )
              }
            />
            {/* <Route
              path="/"
              // exact={true}
              render={props =>
                this.state.token != null ? (
                  <Redirect to={"/dashboard"} />
                ) : (
                      <Redirect to={"/dashboard"} />
                  )
              }
            /> */}
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
