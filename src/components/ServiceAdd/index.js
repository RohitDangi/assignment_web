import React, { Component } from 'react';
import {  FileUploadActions, SessionActions } from "../../actions";
import Dashboard from "../Dashboard";
import Loader from "../Loader";
import moment from 'moment';
import appConstants from "../../config/AppConstants";

class ServiceAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceId: "",
      serviceName:"",
      serviceIcon:"",
      isFormValid:false,
      isLoading:false,
      name:"",
      email:"",
      phoneNumber:"",
      city:"",
      country:"",
      pinCode:"",
      profilePicture:"",
      dateOfBirth:new Date()

    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.removeUpload = this.removeUpload.bind(this);
  }
  componentDidMount() {
    if (this.props && this.props.match && this.props.match.params && this.props.match.params.id) {
      this.setState({isLoading:true})
      let id = this.props.match.params.id
      SessionActions
        .getParticularUser(id, (err, res) => {
          if (!err) {
            let data = res && res.data;
            this.setState({
              name: data && data.name ? data.name : "",
              email: data && data.email ? data.email : "",
              profilePicture: data && data.profilePicture ? data.profilePicture : "",
              phoneNumber: data && data.phoneNumber ? data.phoneNumber : "",
              city: data && data.city ? data.city : "",
              country: data && data.country ? data.country : "",
              pinCode: data && data.pinCode ? data.pinCode : "",
              userId: data && data._id,
              isLoading:false,
              dateOfBirth: data && data.dateOfBirth ? moment(data.dateOfBirth).local().format(appConstants.DATE_FORMAT) : new Date(),
              // dateOfBirth: data && new Date(data.dateOfBirth) 
            },()=>{
              this.validateForm()
            })
          }
        })
    }
  }

  handleChange(event) {
    let target = event.target,
      value = target.type === 'checkbox' ? target.checked : target.value,
      name = target.name;
    let errors = this.state.err;

    this.setState({
      err: errors,
      [name]: value
    },()=>{
      this.validateForm()
    })
  }

  validateForm(){
    let {   name, email, phoneNumber, city, country, pinCode, dateOfBirth, profilePicture } = this.state;
    
    if( name, email, phoneNumber, city, country, pinCode, dateOfBirth, profilePicture ){
        this.setState({isFormValid:true})
    } else {
        this.setState({isFormValid:false})
    }
}
  handleSubmitForm(e) {
    // e.preventDefault();

    let { name, email, phoneNumber, city, country, pinCode, dateOfBirth, profilePicture,  isFormValid, userId } = this.state;
    this.setState({isLoading:true})

    if (!isFormValid) {
      return false
    };

    let dataToSend = {
      name, email, phoneNumber, city, country, pinCode, dateOfBirth, profilePicture,
    }
    if (userId) {
      SessionActions
        .editUser(dataToSend, userId, (err, body = {}) => {
          if (err) {
            // TODO SHOW ERROR
            this.setState({isLoading:false})

          } else {
            this.props.history.push("/users")
          }
        })
    } 
    // else {
    //   ServiceActions
    //     .addService(dataToSend, (err, body = {}) => {
    //       if (err) {
    //         // TODO SHOW ERROR
    //         this.setState({isLoading:false})
  
    //       } else {
    //         this.props.history.push("/users")
    //       }
    //     })
    // }
  }
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
    removeUpload(event){
      if (event) {
        event.preventDefault();
        event.stopPropagation()
      }
      let {serviceIcon} = this.state;
      FileUploadActions.deleteFile({filePath:serviceIcon},(err,res)=>{
          console.log("res",res);
          if (err) {
              // show err
          } else {
            this.setState({serviceIcon:""},()=>{
              this.validateForm()
            })
            // event.target.value = null;
          }
      })
  }
  render() {
    let { serviceName, serviceIcon, serviceId, name, email, phoneNumber, city, country, pinCode, dateOfBirth, profilePicture } = this.state;
    return (
      <div id="page-container" className="sidebar-o enable-page-overlay side-scroll page-header-modern ">

        <Dashboard></Dashboard>
        <main id="main-container">
          <div className="content">
          {
                        this.state.isLoading ? 
                        <div className="custm-loader">
                            <Loader></Loader>
                        </div> :null
                    }
            <div className="row mb-30 mt-30">
              <div className="col-12">
                <h2 className="pt-0 mt-10 mb-0 font-size-md">{serviceId ? "Edit" : "Add"} User</h2>
              </div>

            </div>

            <div className="block">

              <div className="block-header block-header-default">
                <h3 className="block-title">User Form</h3>

              </div>

              <div className="block-content block-content-full">



                <div className="">
                  <form action="">
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
                          <input type="email" disabled className="form-control" id="email" name="email" placeholder="Enter Email" value={email} onChange={this.handleChange} />
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
                    {
                      profilePicture ?
                      <div className="row">
                        <div className="col-lg-6 col-sm-6">
                        </div>
                        <div className="col-lg-6 col-sm-6">
                          <div className="form-group">
                            <div className="position-relative imageIcon-wrp">
                            <img className="imageIcon" src={profilePicture}></img>
                            {/* <span className="imageIcon-cross" onClick={this.removeUpload}> <i className="fa fa-times"></i> </span> */}
                            </div>
                          
                          </div>
                        </div>
                      </div>

                      :''
                    }

                    <div className="row mt-20">
                      <div className="col-lg-12 col-sm-12">
                        <div className="form-group">
                          <button type="submit" 
                            disabled={!this.state.isFormValid} 
                            onClick={(e) => {
                            e.preventDefault()
                            this.handleSubmitForm()
                          }} className="btn btn-primary btn-hero">Submit</button>
                        </div>
                      </div>
                    </div>



                  </form>
                </div>
              </div>
            </div>



          </div>



        </main>
      </div>

    );
  }
}

export default ServiceAdd;