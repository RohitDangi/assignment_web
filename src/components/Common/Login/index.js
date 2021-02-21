import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { SessionActions } from "../../../actions";
import appConstants from "../../../config/AppConstants";
// import  scrpt from "../../../assets/js/pages/op_auth_signin.min.js";
import { validateEmail } from "../../../utils/helpers";
import Loader from "../../Loader";
import firebase from 'firebase';

// import Dashboard from "../Dashboard";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            isFormValid:false,
            isLoading:false,
            loginType:null
        }
        this.validateForm = this.validateForm.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
    validateForm = () => {
        let {
          email,
          password,
          errors
        } = this.state;
    
        if (password && validateEmail(email)) {
          this.setState({
            isFormValid: true,
            errors
          });
        } else {
          this.setState({
            isFormValid: false,
            errors
          });
        }
      }
      handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        this.setState({
          [event.target.name]: event.target.value,
        //   errors
        }, () => {
          this.validateForm()
        });
      }
     
      handleEnter(event) {
        if (event) {
          event.preventDefault()
        }
        if (event.which === 13) {
          this.setState({ isLoading: true }, () => {
            this.submitForm(event)
          })
        }
        else {
          this.handleChange(event)
        }
      }
    
      submitForm(event) {
        if (event) {
          event.preventDefault()
        }
    
        const { email, password, isAdminLogin, loginType, isFormValid } = this.state;
        this.setState({isLoading:true})
        if (!isFormValid) {
          this.validateForm()
          return false;
        };
    
        // this.setState({ isLoading: true, isResendLink: false })
    
        const dataToSend = {
          email,
          password,
        };

          SessionActions
          .signIn(dataToSend, (err, res) => {
            if (err) {
              let message = appConstants.SERVER_ERROR
              if (err.message) {
                message = err.message
              }
              let showtoaster = true;
              let dataToSet = {
                // errorMessage: message
              };
              dataToSet.isLoading = false
              this.setState(dataToSet)
              
            } else {
              this.setState({ isLoading: false })
              window.location.href = "/"
            }
          });
        
      };
   

    render() {
        let { email, password, loginType } = this.state;
        return (
            <div id="page-container" className="main-content-boxed">
            <main id="main-container">
            { 
                                    this.state.isLoading ? 
                                        <div className="custm-loader">
                                            <Loader></Loader>
                                        </div> :null
                                }
                <div className="bg-image login-bg">
                    <div className="row mx-0 bg-black-op">
                        <div className="hero-static col-md-6 col-xl-8 d-md-flex align-items-md-end">
                            <div className="p-30" data-toggle="appear">
                                <p className="font-size-h3 font-w600 text-white">
                                    Get Inspired.
                                </p>
                                <p className="font-italic text-white-op">
                                    Copyright &copy; <span className="js-year-copy"></span>
                                </p>
                            </div>
                        </div>
                        <div className="hero-static col-md-6 col-xl-4 d-flex align-items-center bg-white" data-toggle="appear" data-className="animated fadeInRight">
                            <div className="content content-full">
                                <div className="px-30 py-10">
                                    <a className="link-effect font-w700" >
                                        <i className="si si-fire"></i>
                                        <span className="font-size-xl text-primary-dark">TEST</span><span className="font-size-xl"></span>
                                    </a>
                                    <h1 className="h3 font-w700 mt-30 mb-10">Welcome </h1>
                                    
                                      <form className="js-validation-signin px-30" method="post">
                                    <div className="form-group row">
                                        <div className="col-12">
                                            <div className="form-material floating">
                                                <input 
                                                 className="form-control"
                                                 type="email"
                                                 id="login-username"
                                                //  placeholder="joe@email.com"
                                                 autoComplete="new-email"
                                                 name="email"
                                                 value={email}
                                                 onKeyUp={this.handleEnter}
                                                 onChange={this.handleChange}
                                                />
                                                <label for="login-username">Email</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-12">
                                            <div className="form-material floating">
                                                <input
                                                   type="password"
                                                   className="form-control"
                                                   id="login-password"
                                                   name="password"
                                                   onKeyUp={this.handleEnter}
                                                   onChange={this.handleChange}
                                                 />
                                                <label for="login-password">Password</label>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="form-group row">
                                        <div className="col-12">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="login-remember-me" name="login-remember-me"/>
                                                <label className="custom-control-label" for="login-remember-me">Remember Me</label>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="form-group">
                                        <button type="submit"  onClick={this.submitForm} className="btn btn-sm btn-hero btn-alt-primary">
                                            <i className="si si-login mr-10"></i> Sign In
                                        </button>
                                        <div className="mt-30">
                                            <a className="link-effect text-muted mr-10 mb-5 d-inline-block" onClick={(e)=>{
                                              e.preventDefault()
                                              this.props.history.push("signup")
                                            }}>
                                                <i className="fa fa-plus mr-5"></i> Create Account
                                            </a>
                                            {/* <a className="link-effect text-muted mr-10 mb-5 d-inline-block" >
                                                <i className="fa fa-warning mr-5"></i> Forgot Password
                                            </a> */}
                                        </div>
                                    </div>
                                </form>
                                </div>
            
                                
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            </div>
       );
    }
}

export default Login;