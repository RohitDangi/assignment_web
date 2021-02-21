import React, { Component, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Container, Spinner } from "reactstrap";
import routes from './routes';
import { SessionActions} from "../../../actions"
import appConstants from "../../../config/AppConstants";

class AdminLayout extends Component {
  constructor(props) {
    super(props);
    let user = SessionActions.getSessionUser()
    this.state = {
        // isAdmin: true,
        // dataLoaded: false,
        // isFullWidth: mobileCheck() ? false : true,
        user,
        // isProfileUpdated:false
    };
    // this.profileUpdated = this.profileUpdated.bind(this);
  }

  loading = () => (
    null
  );

  render() {
    return (
          <Container fluid className="mt-4">
            <Suspense fallback={this.loading()}>
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={props => (
                      <route.component {...props}/>
                      )} />
                  ) : (null);
                })}
                {
                  <Redirect from="/" to={"/dashboard"} />
                }
              </Switch>
            </Suspense>
          </Container>
        
    );
  }
}

export default (AdminLayout);
