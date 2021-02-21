import alt from '../altInstance';
import { SessionActions }  from '../actions';
import Cookies from 'universal-cookie';
// import moment from 'moment';

const cookie = new Cookies();

class SessionStore {
  constructor() {
    const sessionUser = cookie.get('user', { path: '/' }),
          jwtSession = cookie.get('token', { path: '/' });
    
    this._user = sessionUser || null;
    this._jwt = jwtSession || null;

    this.bindListeners({
      signIn: SessionActions.SIGN_IN,
    });

    this.publicMethods = {
      getSessionUser: function () {
        return this.state._user; 
      },
      isLoggedIn: function () {
        return !!this.state._user;
      },
      getJWTToken: () => {
        return this.state._jwt;
      }
    }
  }

  signIn(payload) {
    if(!payload.error) {
      let userData = JSON.parse(JSON.stringify(payload.data || {}))

      this._jwt = payload.data && payload.data.token;
      this._user = userData.user;

      cookie.set('token', this._jwt, { path: '/' });
      cookie.set('user', userData, { path: '/'  });
    }
  }
}

export default alt.createStore(SessionStore, 'SessionStore');
