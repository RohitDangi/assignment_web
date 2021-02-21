import Agent from '../services/RequestInstance';
import { ServerError } from '../utils/helpers';

import config from '../config/Config';
import Cookies from 'universal-cookie';

const cookie = new Cookies();
const BACKEND_URL = config.BACKEND_URL;

function signIn(payload, cb) {
    console.log("payload",payload);
  Agent
    .fire('post', `${BACKEND_URL}/login`)
    .send(payload)
    .end((err, res) => {
      var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
      let userData = JSON.parse(JSON.stringify((res && res.body && res.body.data) || {}))
      if (!error) {
        console.log("req",res.body);
        let loginType = userData.loginType
        let jwt = res.body.token;
        console.log("jwt",jwt);
        // user = userData;
        cookie.set('user', (userData || {}), { path: '/' });
        cookie.set('token', jwt, { path: '/' });
        // cookie.set('loginType', loginType, { path: '/' });
      }
      if (typeof cb === 'function') return cb(error, userData);
    });
}

function getSessionUser() {
  return cookie.get("user")
}

function signUp(payload, cb) {
  Agent
    .fire('post', `${BACKEND_URL}/signup`, true)
    .send(payload)
    .end((err, res) => {
      var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
      if (typeof cb === 'function') return cb(error, res && res.body);
    });
}

function logout() {
  cookie.remove('user', { path: '/' });
  cookie.remove('token', { path: '/' });
  cookie.remove('loginType', { path: '/' });
  window.location.reload()
  window.location.href="#/login"
}
function getAllUsers(payload, cb) {
  Agent
    .fire('get', `${BACKEND_URL}/users`)
    .query(payload)
    .end((err, res) => {
      var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
      if (typeof cb === 'function') return cb(error, res && res.body);
    });
}
function getParticularUser(id, cb) {
  Agent
    .fire('get', `${BACKEND_URL}/user/${id}`)
    .end((err, res) => {
      var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
      if (typeof cb === 'function') return cb(error, res && res.body);
    });
}
function editUser(payload, id, cb) {
  Agent
    .fire('patch', `${BACKEND_URL}/user/${id}`)
    .send(payload)
    .end((err, res) => {
      var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
      if (typeof cb === 'function') return cb(error, res && res.body);
    });
}
function deleteUser( id, cb) {
  Agent
    .fire('delete', `${BACKEND_URL}/user/${id}`)
    .end((err, res) => {
      var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
      if (typeof cb === 'function') return cb(error, res && res.body);
    });
}
export default {  
  signIn,
  getSessionUser,
  signUp,
  logout,
  getAllUsers,
  getParticularUser,
  editUser,
  deleteUser
}
