// import React, { Component } from "react";
// import { StudentDashboardActions, SessionActions, FacultyActions, StudentActions, TrainerDashboardActions } from "../../../actions";
// import Cookies from 'universal-cookie';
// import appConstants from "../../../config/AppConstants";
// import { mobileCheck } from "../../../utils/helpers";
// import moment from 'moment'
// import config from '../../../config/Config';

// const cookie = new Cookies();
// const BACKEND_URL = config.BACKEND_URL;

// class AdminSideBar extends Component {
//     constructor(props) {
//         super(props);
//         let user = SessionActions.getSessionUser()
//         this.state = {
//             productList: [],
//             user,
//             isFullWidth: true,
//             role: (user && user.role && user.role.name) || "",
//             trainerCaurseList: [],
//             loginType: (user && user.loginType) || "",
//             rightSideShow: false,
//             isDashBoard: false,
//             roleList: [],
//             unreadNotification: 0,
//             showNotifications: false,
//             notificationList: {},
//             unreadNotification: 0,
//             installmentDueCounter: 0,
//             batchValidityCounter: 0,
//             isBlocked: false,
//             isDemoUser: false,
//         }
//         this.toogleClass = this.toogleClass.bind(this);
//         this.checkMobile = this.checkMobile.bind(this)
//         this.handleToggleClass = this.handleToggleClass.bind(this);
//         this.toogleShowNotification = this.toogleShowNotification.bind(this);
//         this.fetchNotifications = this.fetchNotifications.bind(this);
//         this.fetchNotificationsUnread = this.fetchNotificationsUnread.bind(this);
//         this.goToProfile = this.goToProfile.bind(this);
//         this.getStudentData = this.getStudentData.bind(this);
//     }

//     componentDidMount() {
//         let { role, loginType, user } = this.state;
//         let isDemoUser = (user && user.isDemo === 1 ? true : false) || this.state.isDemo;
//         let productList = []
//         this.setState({
//             isFullWidth: this.props.isFullWidth,
//             isDemoUser
//         })
//         if (role === appConstants.ROLES.trainer.name) {
//             TrainerDashboardActions
//                 .getCourseList((err, res) => {
//                     if (!err) {
//                         this.setState({
//                             trainerCaurseList: res.data || this.state.trainerCaurseList
//                         })
//                     }
//                 })
//         }
//         if (loginType === appConstants.loginType.STUDENT) {
//             StudentDashboardActions
//                 .getProductCoureList((err, res) => {
//                     if (!err) {
//                         productList = (res && res.data) || this.state.productList
//                         this.setState({
//                             productList
//                         })
//                     }
//                 })
//             this.getStudentData()
//             this.fetchNotificationsUnread()

//         }
//         if (loginType === appConstants.loginType.FACULTY) {
//             FacultyActions
//                 .getLoginFacultyRoleList((err, res) => {
//                     if (!err) {
//                         this.setState({
//                             roleList: (res && res.data) || this.state.roleList
//                         })
//                     }
//                 })
//         }
//     }

//     getStudentData() {
//         let { productList, user } = this.state;
//         let isDemoUser = (user && user.isDemo === 1 ? true : false) || this.state.isDemo;

//         StudentActions
//             .getStudentData((err, result) => {
//                 if (!err) {
//                     let studentDetail = (result && result.data) || this.state.studentDetail;
//                     let createdAt = studentDetail.createdAt;
//                     let installments = studentDetail.installmentObj || [];
//                     let installmentDueCounter = 0;
//                     let batchValidityCounter = 0;
//                     let products = studentDetail.product || [];
//                     let nothingPaid = false;
//                     let blockDemoUSer = false;
//                     let allCoursesBlocked = false;
//                     let counter = 0
//                     let dueCounter = 0

//                     if (isDemoUser) {
//                         if (moment(createdAt).utc().add(15, 'days').format('YYYY-MM-DD HH:mm:ss') < moment().utc().format("YYYY-MM-DD HH:mm:ss")) {
//                             blockDemoUSer = true
//                         }
//                     }
//                     products.forEach(element => {
//                         let courses = element.courses || [];
//                         courses.forEach(course => {
//                             let batches = course.batches || [];
//                             batches.forEach(batch => {
//                                 if (moment(batch.validity).utc().format(appConstants.DATE_FORMAT) < moment().utc().format(appConstants.DATE_FORMAT)) {
//                                     batchValidityCounter = batchValidityCounter + 1;
//                                 }

//                             });
//                         });
//                     });
//                     if (productList.length == 1) {

//                         let courses = productList[0].courses || [];
//                         courses.forEach(course => {
//                             console.log("course", course);
//                             if (course.isDisabled || course.isBlocked) {
//                                 counter = counter + 1
//                             }
//                         });
//                         console.log("counter", counter);
//                         if (counter === courses.length) {
//                             allCoursesBlocked = true
//                         }
//                     }
//                     // alert(allCoursesBlocked)
//                     if (installments.length === 1 && installments[0].status === "DUE" && moment(installments[0].dueDate).utc().format(appConstants.DATE_FORMAT) < moment().utc().format(appConstants.DATE_FORMAT)) {
//                         nothingPaid = true
//                     }

//                     installments.forEach(element => {
//                         if (element.status !== appConstants.installmentStatus.paid) {
//                             dueCounter = dueCounter + 1
//                         }
//                     });
//                     installments.forEach(element => {
//                         if (element.status === "DUE" && moment(element.dueDate).utc().add(45, 'days').format(appConstants.DATE_FORMAT) < moment().utc().format(appConstants.DATE_FORMAT)) {
//                             installmentDueCounter = installmentDueCounter + 1
//                         }
//                     });
//                     if (installmentDueCounter > 0 || batchValidityCounter > 0 || products.length === 0 || nothingPaid === true || blockDemoUSer === true || allCoursesBlocked || (dueCounter === installments.length && !isDemoUser)) {
//                         this.setState({ isBlocked: true })
//                         this.props.history.push(`/student/blocked`)
//                         // window.location.href ="#/student/blocked"
//                     }
//                     this.setState({
//                         studentDetail,
//                         installmentDueCounter,
//                         // installments,
//                         batchValidityCounter,
//                         products,
//                         dueCounter
//                     })
//                 }
//             })
//     }
//     // componentDidUpdate(prevProps,prevState) {
//     //     console.log("props",prevProps,);
//     //     if(prevProps.isProfileUpdated != this.props.isProfileUpdated) {
//     //         if(this.props.isProfileUpdated) {
//     //             let profileUpdated = this.props.profileUpdated;
//     //             if(this.props.profileUpdated) {
//     //                 profileUpdated()
//     //             }
//     //             this.getStudentData()
//     //         }
//     //     }

//     // }
//     handleChangeRoute(path, event) {
//         if (event) event.preventDefault()
//         this.checkMobile()
//         this.props.history.push(`${path}`)
//     }

//     handleLogout(path, event) {
//         if (event) event.preventDefault()
//         let { loginType } = this.state;
//         // cookie.remove('user', { path: '/' });
//         // cookie.remove('token', { path: '/' });
//         // cookie.remove('loginType', { path: '/' });
//         // cookie.remove('isTermsAndConditionsAccepted', { path: '/' });
//         // window.location = '/';
//         StudentDashboardActions.logout()
//         if (loginType === appConstants.loginType.STUDENT) {
//             window.location = '/';
//         }
//         else {
//             window.location.href = '/#/admin/login';
//         }
//     }

//     handleRedirect(productId, courseId, event) {
//         if (event) event.preventDefault();
//         let ismobile = mobileCheck()
//         if (ismobile) {
//             this.toogleClass()
//         }
//         // this.setState({isFullWidth:!ismobile})
//         this.props.history.push(`/student/videolisting/${courseId}`)
//     }

//     checkMobile() {
//         let ismobile = mobileCheck()
//         if (ismobile) {
//             this.toogleClass()
//         }
//     }
//     toogleClass(event) {
//         if (event) {
//             event.preventDefault();
//         }
//         this.props.toogleClass();
//         if (document.getElementsByClassName("sub-menu collapse show")[0]) {
//             document.getElementsByClassName("sub-menu collapse show")[0].classList.remove("show")
//         }
//     }

//     handleToggleClass(event) {
//         if (event) {
//             event.preventDefault();
//         }
//         this.props.handleToggleClass();
//         this.setState({ rightSideShow: !this.state.rightSideShow })
//     }
//     changeRole(role, event) {
//         if (event) {
//             event.preventDefault();
//         }
//         SessionActions
//             .changeRole(role.uuid, (err, res) => {
//                 if (!err) {
//                     window.location.href = "/"
//                 }
//             })
//     }

//     toogleShowNotification() {
//         this.setState({
//             showNotifications: !this.state.showNotifications
//         }, () => {
//             this.fetchNotifications();
//             this.fetchNotificationsUnread()
//         })
//     }
//     fetchNotifications() {
//         StudentDashboardActions
//             .getStudentNotifications((err, res) => {
//                 if (!err) {
//                     let notificationJSON = {};
//                     let notificationList = res.data || []
//                     notificationList.forEach(element => {
//                         let createdAt = moment(element.createdAt).format("YYYY-MM-DD");
//                         if (notificationJSON.hasOwnProperty([createdAt])) {
//                             notificationJSON[createdAt].push(element)
//                         } else {
//                             notificationJSON[createdAt] = [];
//                             notificationJSON[createdAt].push(element)
//                         }
//                     });
//                     this.setState({
//                         notificationList: notificationJSON || this.state.notificationList,
//                     })
//                 }
//             })
//     }
//     fetchNotificationsUnread() {
//         StudentDashboardActions
//             .getStudentNotificationsCount((err, res) => {
//                 if (!err) {
//                     this.setState({
//                         unreadNotification: (res.data && res.data.unreadNotification) || this.state.unreadNotification,
//                         hasUnreadNOtification: (res.data && res.data.unreadNotification > 0 ? true : false),
//                         isLoading: false
//                     })
//                 }
//             })
//     }
//     createMarkup(data) {
//         return { __html: data };
//     }
//     goToProfile(event) {
//         event.preventDefault()
//         this.props.history.push("/student/profile")
//     }
//     render() {
//         let { productList, trainerCaurseList, role, isBlocked, loginType, user, roleList, installmentDueCounter, batchValidityCounter, showNotifications, notificationList, hasUnreadNOtification, studentDetail } = this.state;
//         let isDemo = user.isDemo === 1 ? true : false;
//         let isDashBoard = false;
//         let pathname = this.props.location.pathname;
//         if (pathname === '/student/dashboard') {
//             isDashBoard = true
//         }
//         else {
//             isDashBoard = false
//         }

//         let isPaymentDisabled = false
//         if(productList.length ===0) {
//             isPaymentDisabled= true
//         }
//         return (
//             // <section className="dashborad-section">
//             <>
//                 <header className="header-top">
//                     <div className="container-fluid">
//                         <div className="row">
//                             <div className="col-4">

//                                 <div className="logo-timer">
//                                     <div class="side-menu-icon" >
//                                         <img src="./img/menu-icon.png" alt="" onClick={this.toogleClass}></img>
//                                     </div>
//                                     <div className="logo">
//                                         <a onClick={this.handleChangeRoute.bind(this, `/`)} ><img src="/img/logo.png" alt="" className="img img-fluid logo-d"></img>
//                                             <img src="/img/logo_mbl.png" className="img img-fluid logo-m"></img></a>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="col-8">

//                                 <div className="logout">

//                                     <div className="">
//                                         <a className="close-sidebar-right" href="#"><img src="/img/close-icon.png" alt=""></img></a>
//                                     </div>
//                                     <div className="row">
//                                         <div className="col-1 col-lg-5">

//                                         </div>
//                                         <div className="col-11 pr-0 pr-sm-0 pr-lg-0 col-lg-7 ">

//                                             <ul className="ul-header-user-info">
//                                                 {
//                                                     loginType === appConstants.loginType.STUDENT ?
//                                                         <li>
//                                                             <div className="notification-fb">
//                                                                 <div onClick={this.toogleShowNotification} className="notification-fb-bell">
//                                                                     <img src="./img/icn_notification-header.png"></img>
//                                                                     {
//                                                                         hasUnreadNOtification ?
//                                                                             <p></p> : ""
//                                                                     }
//                                                                 </div>
//                                                                 {
//                                                                     showNotifications ?
//                                                                         <div className="notification-box-fb">
//                                                                             <div className="row">
//                                                                                 <div className="col-6">
//                                                                                     <h3>Notifications</h3>
//                                                                                 </div>
//                                                                                 <div className="col-6">
//                                                                                     <div className="nt-box-fb-close">
//                                                                                         <img onClick={this.toogleShowNotification} src="./img/close-icon.png" alt=""></img>
//                                                                                     </div>
//                                                                                 </div>
//                                                                             </div>

//                                                                             <>
//                                                                                 {
//                                                                                     Object.keys(notificationList).length > 0 ? Object.keys(notificationList).map((notificationObj) => {
//                                                                                         return <>
//                                                                                             <h5 className="date-nt-fb">{moment(notificationObj).format(appConstants.LOCAL_DATE_FORMAT)}</h5>
//                                                                                             {/* <b class="time-head">{moment(notificationObj).format(appConstants.LOCAL_DATE_FORMAT)}</b> */}
//                                                                                             {
//                                                                                                 notificationList[notificationObj] && notificationList[notificationObj].map((notification) => {
//                                                                                                     let body = notification.body ? notification.body : "";
//                                                                                                     return (
//                                                                                                         //     <div class="notification-box">
//                                                                                                         //             <h6>{notification.batchId && notification.batchId.batchName} <span>{notification.notificationDate ? moment.utc(notification.notificationDate).local().format("HH:mm"): moment.utc(notification.createdAt).local().format("HH:mm")}</span></h6>
//                                                                                                         //             <span className="preserve-space" dangerouslySetInnerHTML={this.createMarkup(body)}></span>
//                                                                                                         // </div>
//                                                                                                         <div className="nt-group-fb">

//                                                                                                             <div className="row">
//                                                                                                                 <div className="col-10">
//                                                                                                                     <h6>{notification.batchId && notification.batchId.batchName}</h6>
//                                                                                                                 </div>
//                                                                                                                 <div className="col-2">
//                                                                                                                     <span>{notification.notificationDate ? moment.utc(notification.notificationDate).local().format("HH:mm") : moment.utc(notification.createdAt).local().format("HH:mm")}</span>
//                                                                                                                 </div>

//                                                                                                             </div>
//                                                                                                             <p className="mt-3" dangerouslySetInnerHTML={this.createMarkup(body)}></p>
//                                                                                                         </div>
//                                                                                                     )
//                                                                                                 })
//                                                                                             }
//                                                                                         </>
//                                                                                     }) : <p className="time-head"> No Notification to show.</p>
//                                                                                 }
//                                                                             </>
//                                                                         </div>
//                                                                         : ""
//                                                                 }

//                                                             </div>
//                                                         </li>
//                                                         : ""
//                                                 }

//                                                 <li>
//                                                     <div class="dropdown show">
//                                                         <a class=" dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                                                             {
//                                                                 loginType === appConstants.loginType.STUDENT ?
//                                                                     <>
//                                                                         <img className="user-img-drp" src={studentDetail && studentDetail.profilePicThumbUrl ? `${BACKEND_URL}/${studentDetail.profilePicThumbUrl}` : "./img/circle-im.png"}></img>   <span>{studentDetail && studentDetail.fullname}</span>
//                                                                     </> :
//                                                                     <>
//                                                                         <img className="user-img-drp" src="./img/circle-im.png"></img>   <span>{user && user.fullname}</span>
//                                                                     </>
//                                                             }
//                                                             <img className="icon-arrow-user-drp" src="./img/Icn_arrow-user-drp.png"></img>
//                                                         </a>

//                                                         <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
//                                                             {
//                                                                 loginType === appConstants.loginType.STUDENT ?
//                                                                     <a class="dropdown-item" href="#" onClick={this.goToProfile}>Profile</a> : ""

//                                                             }
//                                                             <a class="dropdown-item" onClick={this.handleLogout.bind(this, `/login`)} href="#">Logout</a>

//                                                         </div>
//                                                     </div>
//                                                 </li>
//                                                 <li className="d-none">

//                                                     <div className="logout-wrapper">
//                                                         {
//                                                             isDashBoard ?
//                                                                 <div className="profile-icon mr-3" onClick={this.handleToggleClass}>
//                                                                     <img src="/img/user.png" />
//                                                                 </div> : ""
//                                                         }
//                                                         <a href="#" onClick={this.handleLogout.bind(this, `/login`)}>
//                                                             <p>Logout</p>
//                                                         </a>
//                                                         <div className="logout-icon">
//                                                             <a href="#" onClick={this.handleLogout.bind(this, `/login`)}><img src="/img/logout-icon.png" alt=""></img> </a>
//                                                         </div>
//                                                     </div>
//                                                 </li>
//                                             </ul>



//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </header>
//                 <div className={this.props.isFullWidth ? "sidebar menu-icon-reset left setsidebar" : "sidebar fliph left setsidebar"}>
//                     <ul className="list-sidebar bg-defoult">
//                         <div className="menu-icon">
//                             <img src="/img/menu-icon.png" alt=""></img>
//                         </div>
//                         {
//                             loginType === appConstants.loginType.FACULTY ? <li>
//                                 <a href="" data-toggle="collapse" data-target="#role" className="collapsed">
//                                     <img className="side-option-icon" src="/img/case-study-icon.png" alt=""></img>
//                                     <span className="nav-label">Role</span>
//                                 </a>
//                                 <ul className="sub-menu course-sub-menu collapse" id="role">
//                                     {
//                                         roleList.map((role, index) => {
//                                             return (
//                                                 <li className="" onClick={this.changeRole.bind(this, role)} key={index}><a href="#" >{role.displayName}</a></li>

//                                             )
//                                         })
//                                     }
//                                 </ul>
//                             </li> : null
//                         }
//                         {/* {
//                            loginType == appConstants.loginType.STUDENT ?
//                             <li>
//                             <a href="#/student/dashboard-new">
//                                 <img className="side-option-icon" src="/img/interview-icon.png" alt=""></img>
//                                 <span className="nav-label">New Dash</span>
//                             </a>
//                         </li> : null
//                         } */}



//                         <li className={isBlocked ? "border-0 disabled" : "border-0"}>
//                             <a href="#" onClick={this.handleChangeRoute.bind(this, `/`)} >
//                                 <img className="side-option-icon" src="/img/home-icon.png" alt="hello"></img>
//                                 <span className="nav-label">Home</span>
//                             </a>
//                         </li>
//                         {
//                             loginType === appConstants.loginType.STUDENT || role === appConstants.ROLES.trainer.name ? <li>
//                                 <a href="#/studentCourses" className="collapsed" onClick={(event) => {
//                                     event.preventDefault();
//                                 }}>

//                                     <span className="nav-label nav-label-divide">Courses</span>
//                                 </a>
//                                 {/* <ul className="sub-menu collapse" id={this.props.isFullWidth ? "Courses": ""}> */}
//                                 <ul className={`sub-menu show ${role === appConstants.ROLES.trainer.name ? "tr-sub-menu-pd-left" : ""}`} >
//                                     {
//                                         productList.map((product) => {
//                                             if (!product.courses) product.courses = [];
//                                             return <>
//                                                 <a href="#/productCourse" data-toggle="collapse" data-target={`#product-${product.uuid}`} className={this.props.isFullWidth ? isBlocked ? "product-name collapsed disabled" : "product-name collapsed " : "product-name"}>{product.productName} </a>
//                                                 <ul className="sub-menu collapse course-sub-menu" id={`product-${product.uuid}`}>
//                                                     {
//                                                         product.courses.map((course, index) => {
//                                                             return <li className={course.isDisabled ? "disabled" : ""} key={index}><a href="#" onClick={this.handleRedirect.bind(this, product.uuid, course.courseId)}>{course.courseName}</a></li>
//                                                         })
//                                                     }
//                                                 </ul>
//                                             </>

//                                         })
//                                     }
//                                     {
//                                         role === appConstants.ROLES.trainer.name && trainerCaurseList.length > 0 ? trainerCaurseList.map((course, index) => {
//                                             return <li className="" key={index}><a href="#" onClick={this.handleRedirect.bind(this, "", course.uuid)}>{course.courseName}</a></li>
//                                         }) : null
//                                     }

//                                 </ul>

//                             </li> : null

//                         }
//                         {
//                             role === appConstants.ROLES.evaluator.name ? <li>
//                                 <a href="#/evaluator/case-studies">
//                                     <img className="side-option-icon" src="/img/case-study-icon.png" alt=""></img>
//                                     <span className="nav-label">Case Study & Assignments</span>
//                                 </a>
//                             </li> : null
//                         }
//                         {
//                             role === appConstants.ROLES.evaluator.name ? <li>
//                                 <a href="#/evaluator/archive">
//                                     <img className="side-option-icon" src="/img/case-study-icon.png" alt=""></img>
//                                     <span className="nav-label">Archive Case Study</span>
//                                 </a>
//                             </li> : null
//                         }
//                         {
//                             loginType == appConstants.loginType.STUDENT ?
//                                 isDemo ? "" :
//                                     <li>
//                                         <a href="#/student/case-studies" data-toggle="collapse" data-target="#case-study-student" className={isBlocked ? "collapsed disabled" : "collapsed"}>
//                                             <img className="side-option-icon" src="/img/case-study-icon.png" alt=""></img>
//                                             <span className="nav-label">Case Study & Assignments</span>
//                                         </a>
//                                         <ul className="sub-menu course-sub-menu collapse" id="case-study-student">
//                                             <li className=""><a href="#/student/case-studies" onClick={this.checkMobile}>Projects</a></li>
//                                             <li className=""><a href="#/student/history" onClick={this.checkMobile}>Evaluation Tracking</a></li>
//                                             <li className=""><a href="#/student/file-vault" onClick={this.checkMobile}>Submitted Files</a></li>

//                                         </ul>
//                                     </li> : null
//                         }
//                         {
//                             loginType == appConstants.loginType.STUDENT ?
//                                 isDemo ? "" :
//                                     <li >
//                                         <a href="#/student/orders" className={isPaymentDisabled ? "disabled":""} onClick={this.checkMobile}>
//                                             <img className="side-option-icon set-wd" src="/img/pay-card.png" alt=""></img>
//                                             <span className="nav-label">Fee</span>
//                                         </a>
//                                     </li> : null
//                         }

//                         {
//                             role === appConstants.ROLES.counsellor.name ? <li>
//                                 <a href="#/counsellor/student-list">
//                                     <img className="side-option-icon" src="/img/case-study-icon.png" alt=""></img>
//                                     <span className="nav-label">Students</span>
//                                 </a>
//                             </li> : null
//                         }
//                         {
//                             role === appConstants.ROLES.superAdmin.name || role === appConstants.ROLES.admin.name ?
//                                 <>
//                                     <li>
//                                         <a href="#/student/case-studies" data-toggle="collapse" data-target="#batch-configuration" className="collapsed">
//                                             <img className="side-option-icon" src="/img/batch-config-icon.png" alt=""></img>
//                                             <span className="nav-label">Batch Configuration</span>
//                                         </a>
//                                         <ul className="sub-menu course-sub-menu collapse" id="batch-configuration">
//                                             <li className=""><a href="#/batch" onClick={this.checkMobile}>Batch</a></li>
//                                             <li className=""><a href="#/class" onClick={this.checkMobile}>Class</a></li>
//                                             <li className=""><a href="#/batchNotifications" onClick={this.checkMobile}>Batch Notifications</a></li>
//                                         </ul>
//                                     </li>
//                                     <li>
//                                         <a href="#/student">
//                                             <img className="side-option-icon" src="/img/student-sidebar-icon.png" alt=""></img>
//                                             <span className="nav-label">Student</span>
//                                         </a>
//                                     </li>
//                                     <li>
//                                         <a href="#/faculty">
//                                             <img className="side-option-icon" src="/img/fac-sidebar-icon.png" alt=""></img>
//                                             <span className="nav-label">Employee</span>
//                                         </a>
//                                     </li>
//                                     <li>
//                                         <a href="#/student/case-studies" data-toggle="collapse" data-target="#configure-course" className="collapsed">
//                                             <img className="side-option-icon" src="/img/config-course-icon.png" alt=""></img>
//                                             <span className="nav-label">Configure Course</span>
//                                         </a>
//                                         <ul className="sub-menu course-sub-menu collapse" id="configure-course">
//                                             <li className=""><a href="#/module" onClick={this.checkMobile}>Module</a></li>
//                                             <li className=""><a href="#/course" onClick={this.checkMobile}>Course</a></li>
//                                             <li className=""><a href="#/product" onClick={this.checkMobile}>Product</a></li>
//                                             <li className=""><a href="#/module-material" onClick={this.checkMobile}>Module Material</a></li>
//                                         </ul>
//                                     </li> </> : null
//                         }
//                         {
//                             role === appConstants.ROLES.superAdmin.name ?
//                                 <>
//                                     <li>
//                                         <a href="#/student/case-studies" data-toggle="collapse" data-target="#configure-lms" className="collapsed">
//                                             <img className="side-option-icon" src="/img/config-lms-icon.png" alt=""></img>
//                                             <span className="nav-label">Configure Lms</span>
//                                         </a>
//                                         <ul className="sub-menu course-sub-menu collapse" id="configure-lms">
//                                             {/* <li className=""><a href="#/slot" onClick={ this.checkMobile}>Slot</a></li> */}
//                                             <li className=""><a href="#/learningmode" onClick={this.checkMobile}>Learning Mode</a></li>
//                                             <li className=""><a href="#/module-material-status" onClick={this.checkMobile}>Material Status</a></li>
//                                             <li className=""><a href="#/lookup" onClick={this.checkMobile}>Lookup</a></li>
//                                             <li className=""><a href="#/batchtype" onClick={this.checkMobile}>Batch Type</a></li>
//                                             <li className=""><a href="#/role" onClick={this.checkMobile}>Role</a></li>
//                                             <li className=""><a href="#/zoom/credentials" onClick={this.checkMobile}>Zoom</a></li>
//                                             <li className=""><a href="#/vimeo/credentials" onClick={this.checkMobile}>Vimeo</a></li>
//                                             <li className=""><a href="#/mail/credentials" onClick={this.checkMobile}>Mail</a></li>
//                                             <li className=""><a href="#/mail/triggers" onClick={this.checkMobile}>Triggers</a></li>
//                                             <li className=""><a href="#/upload/holidays" onClick={this.checkMobile}>Holidays</a></li>
//                                             <li className=""><a href="#/upload/leaves" onClick={this.checkMobile}>Employee Leaves</a></li>
//                                             <li className=""><a href="#/latefee" onClick={this.checkMobile}>Late Fee</a></li>
//                                         </ul>
//                                     </li>
//                                     <li>
//                                         <a href="#/student/case-studies" data-toggle="collapse" data-target="#configure-company" className="collapsed">
//                                             <img className="side-option-icon" src="/img/config-company-icon.png" alt=""></img>
//                                             <span className="nav-label">Configure Company</span>
//                                         </a>
//                                         <ul className="sub-menu course-sub-menu collapse" id="configure-company">
//                                             <li className=""><a href="#/firm" onClick={this.checkMobile}>Firm</a></li>
//                                             <li className=""><a href="#/defaultfirm" onClick={this.checkMobile}>Default Firm</a></li>
//                                             <li className=""><a href="#/location" onClick={this.checkMobile}>Location</a></li>
//                                             <li className=""><a href="#/gst" onClick={this.checkMobile}>Gst</a></li>
//                                         </ul>
//                                     </li> </> : null
//                         }
//                         {
//                             role === appConstants.ROLES.superAdmin.name ?
//                                 <li>
//                                     <a href="#/coursewise/sample-cv">
//                                         <img className="side-option-icon" src="/img/case-study-icon.png" alt=""></img>
//                                         <span className="nav-label">Sample CV</span>
//                                     </a>
//                                 </li> : null
//                         }
//                         {
//                             role === appConstants.ROLES.superAdmin.name ?
//                                 <li>
//                                     <a href="#/coursewise/interview-questions">
//                                         <img className="side-option-icon" src="/img/interview-icon.png" alt=""></img>
//                                         <span className="nav-label">Interview Qusetions</span>
//                                     </a>
//                                 </li> : null
//                         }

//                         {
//                             loginType == appConstants.loginType.STUDENT ?
//                                 isDemo ? "" :
//                                     <li>
//                                         <a href="#" data-toggle="collapse" data-target="#interview" className={isBlocked ? "collapsed disabled" : "collapsed"}>
//                                             <img className="side-option-icon" src="/img/interview-icon.png" alt=""></img>
//                                             <span className="nav-label">Placement Assistance</span>
//                                         </a>
//                                         <ul className="sub-menu course-sub-menu collapse" id="interview">
//                                             <li className=""><a href="#/course/sample-cv" onClick={this.checkMobile}>Sample CV</a></li>
//                                             <li className=""><a href="#/student/sample-cv" onClick={this.checkMobile}>Upload CV</a></li>
//                                             <li className=""><a href="#/course/interview-questions" onClick={this.checkMobile}>Interview Questions</a></li>
//                                             {/* <li className=""><a href="#">Interview Qusetions</a></li> */}
//                                         </ul>
//                                     </li> : null
//                         }
//                         {
//                             loginType == appConstants.loginType.STUDENT ?
//                                 <li>
//                                     <a href={appConstants.BLOG_URL} target="_blank" className={isBlocked ? "disabled" : ""} >
//                                         <img className="side-option-icon" src="/img/interview-icon.png" alt=""></img>
//                                         <span className="nav-label">Blogs</span>
//                                     </a>
//                                 </li> : null
//                         }
//                         {/* <li>
//                             <a href="#" data-toggle="collapse" data-target="#interview" className="collapsed nav-student">
//                                 <img className="side-option-icon" src="/img/interview-icon.png" alt=""></img>
//                                 <span className="nav-label">Interview</span>
//                             </a>
//                             <ul className="sub-menu collapse" id="interview">
//                                 <li className=""><a href="#">Sample CV</a></li>
//                                 <li className=""><a href="#">Upload CV</a></li>
//                                 <li className=""><a href="#">Interview Qusetions</a></li>
//                             </ul>
//                         </li> */}
//                         {/* <li> <a href="" className="disable-nav-student">
//                             <img className="side-option-icon" src="/img/book-app-icon.png" alt=""></img>
//                             <span className="nav-label">Book an Appointment</span> </a>
//                         </li>
//                         <li> <a href="#" className="disable-nav-student">
//                             <img className="side-option-icon" src="/img/class-icon.png" alt=""></img>
//                             <span className="nav-label">Class Schedule</span></a>
//                         </li> */}
//                         {/* <li> <a href="#" className="disable-nav-student">
//                             <img className="side-option-icon" src="/img/ref-material.png" alt=""></img>
//                             <span className="nav-label">Reference Material</span></a>
//                         </li> */}
//                     </ul>

//                     {
//                         loginType == appConstants.loginType.STUDENT ?
//                             <div className="help-sidebar">

//                                 <div className="row">
//                                     <div className="col-2 col-lg-2">
//                                         <img src="./img/help-icon.png"></img>
//                                     </div>
//                                     <div className="col-9 col-lg-10">
//                                         <p>Need help?</p>
//                                         {
//                                             isDemo ?
//                                                 <a href="javascript:;">info@analytixlabs.co.in</a> :
//                                                 <a href="javascript:;">training@analytixlabs.co.in</a>
//                                         }
//                                         <br></br>
//                                         <a href="javascript:;">
//                                             +91-95552-19007
//                             </a>
//                                     </div>

//                                 </div>
//                             </div> : ""

//                     }

//                 </div>


//             </>


//             // </section>
//         )
//     }
// }



// export default (AdminSideBar);
