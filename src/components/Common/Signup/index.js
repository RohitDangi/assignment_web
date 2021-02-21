import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { SessionActions, FileUploadActions } from "../../../actions";
import appConstants from "../../../config/AppConstants";
// import  scrpt from "../../../assets/js/pages/op_auth_signin.min.js";
import { validateEmail } from "../../../utils/helpers";
import Loader from "../../Loader";
import firebase from 'firebase';

// import Dashboard from "../Dashboard";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            firstName:"",
            lastName:"",
            phoneNumber:"",
            phoneExt:"+968",
            firebaseUserId:"",
            isFormValid:false,
            isLoading:false,
            hasNext:false,
            isFormVisible:false
        }
        this.validateForm = this.validateForm.bind(this);
        this.validateNext = this.validateNext.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.handleUpload = this.handleUpload.bind(this);

    }
    validateForm(){
      let { password,  name, email, phoneNumber, city, country, pinCode, dateOfBirth, profilePicture } = this.state;
      
      if( name, email, password, phoneNumber, city, country, pinCode, dateOfBirth, profilePicture ){
          this.setState({isFormValid:true})
      } else {
          this.setState({isFormValid:false})
      }
  }
      handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        // let errors = this.state.errors;
        // switch (name) {
        //   case 'email':
        //     errors.email = validateEmail(value) ? "" : "Email is not valid!";
        //     break;
        //   case 'password':
        //     errors.password = value.length > 0 ? "" : "Password is required!";
        //     break;
        //   default:
        //     break;
        // }
        this.setState({
          [event.target.name]: event.target.value,
        //   errors
        }, () => {
          this.validateForm()
        });
      }
      validateNext = () => {
        let {
          email,
          password,
         } = this.state;
    
        if (password && validateEmail(email)) {
          this.setState({
            hasNext: true
        });
        } else {
          this.setState({
            hasNext: false
          });
        }
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
    
        let { name, email, phoneNumber, city, country, pinCode, dateOfBirth, profilePicture,  isFormValid, userId, password } = this.state;
    // this.setState({isLoading:true})

    if (!isFormValid) {
      return false
    };

    let dataToSend = {
      name, email, phoneNumber, city, country, pinCode, dateOfBirth, profilePicture, password
    }
      SessionActions
        .signUp(dataToSend, (err, body = {}) => {
          if (err) {
            // TODO SHOW ERROR
            this.setState({isLoading:false})
  
          } else {
            this.setState({ isLoading: false })
            window.location.href = "/"
          }
        })
      };
   
      handleNext(event) {
        if (event) {
          event.preventDefault()
        }
    
        const {  hasNext } = this.state;
        if (!hasNext) {
          this.validateNext()
          return false;
        };
        this.setState({isFormVisible:true})
      };
      handleUpload(event){
        let target = event.target;
        let files = target.files;
        var formData = new FormData();
        for (const key of Object.keys(files)) {
        formData.append('files', files[key])
        }   

        let {serviceIcon} = this.state;
        if (serviceIcon) {
            FileUploadActions.deleteFile({filePath:serviceIcon},(err,res)=>{
              console.log("res",res);
              if (err) {
                  // show err
              } else {
                this.setState({profilePicture:""},()=>{
                  this.validateForm()
                })
                // event.target.value = null;
              }
          })
        }
          FileUploadActions.uploadFile(formData,(err,res)=>{
              console.log("res",res);
              if (err) {
                  // show err
              } else {
                  this.setState({profilePicture:res.data[0].path},()=>{
                      this.validateForm()
                      target.value = null;
                    })
              }
          })
      
    }
    render() {
        let { password, isFormVisible, serviceId, name, email, phoneNumber, city, country, pinCode, dateOfBirth, profilePicture } = this.state;
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
                                        <span className="font-size-xl text-primary-dark">Test Assignment</span><span className="font-size-xl"></span>
                                    </a>
                                    <h1 className="h3 font-w700 mt-30 mb-10">Welcome</h1>
                                    <h2 className="h5 font-w400 text-muted mb-0">Please Sign Up</h2>
                                </div>
            
                                {
                                    !isFormVisible ? 
                                    <form className="js-validation-signin px-30" method="post">
                                        {/* <div className="form-group row">
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
                                        </div> */}
                                        <div className="row">
                      <div className="col-lg-6 col-sm-6">
                        <div className="form-group">
                          <label for="example-nf-email">Name</label>
                          <input type="text" className="form-control" id="name" name="name" placeholder="Enter Name.." value={name} onChange={this.handleChange} />
                        </div>
                      </div>

                      <div className="col-lg-6 col-sm-6">
                        <div className="form-group">
                          <label for="example-nf-email">Email</label>
                          <input type="email"  className="form-control" id="email" name="email" placeholder="Enter Email" value={email} onChange={this.handleChange} />
                        </div>
                      </div>
                      <div className="col-lg-6 col-sm-6">
                        <div className="form-group">
                          <label for="example-nf-email">Password</label>
                          <input
                              type="password"
                              className="form-control"
                              id="login-password"
                              name="password"
                              onKeyUp={this.handleEnter}
                              onChange={this.handleChange}
                              />
                        </div>
                      </div>
                      <div className="col-lg-6 col-sm-6">
                        <div className="form-group">
                          <label for="example-nf-email">Phone Number</label>
                          <input type="text" className="form-control" id="phoneNumber" name="phoneNumber" placeholder="Enter Phone Number" value={phoneNumber} onChange={this.handleChange} />
                        </div>
                      </div>
                      <div className="col-lg-6 col-sm-6">
                        <div className="form-group">
                          <label for="example-nf-email">Date Of Birth</label>
                          <input type="date" className="form-control" id="dateOfBirth" name="dateOfBirth" placeholder="Enter Date Of Birth" value={dateOfBirth} onChange={this.handleChange} />
                        </div>
                      </div>
                      <div className="col-lg-6 col-sm-6">
                        <div className="form-group">
                          <label for="example-nf-email">City </label>
                          <input type="text" className="form-control" id="city" name="city" placeholder="Enter City" value={city} onChange={this.handleChange} />
                        </div>
                      </div>
                      <div className="col-lg-6 col-sm-6">
                        <div className="form-group">
                          <label for="example-nf-email">Country</label>
                          <input type="text" className="form-control" id="country" name="country" placeholder="Enter Country" value={country} onChange={this.handleChange} />
                        </div>
                      </div>
                      <div className="col-lg-6 col-sm-6">
                        <div className="form-group">
                          <label for="example-nf-email">Pin Code</label>
                          <input type="text" className="form-control" id="pinCode" name="pinCode" placeholder="Enter Pin Code" value={pinCode} onChange={this.handleChange} />
                        </div>
                      </div>
                      <div className="col-lg-6 col-sm-6">
                        <div className="form-group">
                            <label for="example-nf-email">Profile Picture</label>
                            <input class="form-control " type="file" onChange={this.handleUpload}></input>
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
                                            <button type="submit"  onClick={this.submitForm} disabled={!this.state.isFormValid} className="btn btn-sm btn-hero btn-alt-primary">
                                                <i className="si si-login mr-10"></i> Submit
                                            </button>
                                            
                                        </div>
                                    </form> 
                                    : <form className="js-validation-signin px-30" method="post">
                                    <div className="form-group row">
                                        <div className="col-12">
                                            <div className="form-material floating">
                                                <input 
                                                 className="form-control"
                                                 type="text"
                                                 id="login-username"
                                                //  placeholder="joe@email.com"
                                                 name="firstName"
                                                //  value={firstName}
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
                                    <div className="form-group">
                                        <button type="submit" disabled={!this.state.isFormValid}   onClick={this.handleNext} className="btn btn-sm btn-hero btn-alt-primary">
                                            <i className="si si-login mr-10"></i> Submit
                                        </button>
                                    </div>
                                </form>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            </div>
       );
    }
}

export default Signup;