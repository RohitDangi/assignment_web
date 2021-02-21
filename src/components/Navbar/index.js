import React, { Component } from 'react';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //   email: "",
        }
        // this.validateForm = this.validateForm.bind(this);
    }
    componentDidMount() {
    }

    render() {
        return (
            <nav id="sidebar">
                    <div className="sidebar-content">
                        <div className="content-header content-header-fullrow px-15">
                            <div className="content-header-section sidebar-mini-visible-b">
                                <span className="content-header-item font-w700 font-size-xl float-left animated fadeIn">
                                    <span className="text-dual-primary-dark">c</span><span className="text-primary">b</span>
                                </span>
                            </div>

                            <div className="content-header-section text-center align-parent sidebar-mini-hidden">
                                <button type="button" className="btn btn-circle btn-dual-secondary d-lg-none align-v-r" data-toggle="layout" data-action="sidebar_close">
                                    <i className="fa fa-times text-danger"></i>
                                </button>

                                <div className="content-header-item">
                                    <a className="link-effect font-w700" href="/#/dashbboard" >
                                        <i className=" font-size-md fa fa-stack-exchange text-primary"></i>
                                        <span className="font-size-md text-dual-primary-dark"> Test App</span><span className="font-size-md text-primary"></span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div class="content-side content-side-full">
                            <ul class="nav-main">
                                <li>
                                    <a class="active" href="/#/dashbboard"><i class="si si-cup"></i><span class="sidebar-mini-hide">Dashboard</span></a>
                                </li>
                                <li>
                                    <a class="" href="/#/users"><i class="si si-equalizer"></i><span class="sidebar-mini-hide">Users</span></a>
                                </li>
                            </ul>
                        </div>

                    </div>
                </nav>
        );
    }
}

export default Navbar;