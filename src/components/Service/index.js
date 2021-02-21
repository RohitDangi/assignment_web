import React, { Component } from 'react';
import {  SessionActions } from "../../actions";
import Dashboard from "../Dashboard";
import DeleteModal from "../DeleteModal";
import toast from 'toasted-notes'
import 'toasted-notes/src/styles.css';
import Loader from "../Loader";

class ServiceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceList: [],
            customerFilter: "",
            text: "",
            deleteId: "",
            isLoading:false,
           
        }
        this.fetchService = this.fetchService.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        this.setState({isLoading:true})
        this.fetchService()
    }

    fetchService() {
        this.setState({isLoading:true})
        let { text, customerFilter } = this.state;
        let dataToSend = {
            
        }
        if (text) {
            dataToSend.text = text
        }
        SessionActions
            .getAllUsers(dataToSend, (err, res) => {
                if (!err) {
                    this.setState({
                        serviceList: res && res.data && res.data,
                        isLoading: false
                    })
                }
            })
    }
    handleChange(event) {
        let target = event.target,
            value = target.type === 'checkbox' ? target.checked : target.value,
            name = target.name;
        this.setState({
            [name]: value
        }, () => {
            this.fetchService()
        })
    }
    goToEdit(id, event) {
        if (event) {
            event.preventDefault()
        }
        this.props.history.push(`editUser/${id}`)
    }
    render() {
        let { serviceList, customerFilter, text } = this.state;
        return (
            <div id="page-container" className="sidebar-o enable-page-overlay side-scroll page-header-modern">

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
                            <div className="col-6">
                                <h2 className="pt-0 mt-10 mb-0 font-size-md">Users List</h2>
                            </div>
                            {/* <div className="col-6">
                                <div className="text-right">
                                    <button className="btn add-btn-css btn-primary" onClick={e => {
                                        e.preventDefault()
                                        this.props.history.push("addUser")
                                    }}>Add</button>
                                </div>
                            </div> */}
                        </div>


                        <div className="row">
                            <div className="col-lg-12">
                                <div className="block">
                                    <div className="block-header block-header-default">
                                        <div className="row w-100">
                                            <div className="col-lg-3">
                                                <h3 className="block-title">Users List</h3>
                                            </div>

                                            <div className="col-lg-9">
                                                <div className="text-right">
                                                    <ul className="filter-ul">
                                                        <li className="w-300px">
                                                            <form>
                                                                <div class="input-group">
                                                                    <input type="text" class="form-control" placeholder="Search" id="text" value={text} name="text" onChange={this.handleChange} />
                                                                    <div class="input-group-append">
                                                                        <button type="submit" disabled class="btn btn-secondary">
                                                                            <i class="fa fa-search"></i>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </li>
                                                        {/* <li>
                                                            <select class="form-control custom-select " id="customerFilter" name="customerFilter" value={customerFilter} onChange={this.handleChange}>
                                                                <option value="all">All</option>
                                                                <option value="customer">Customer</option>
                                                                <option value="broker">Broker</option>
                                                            </select>

                                                        </li> */}
                                                    </ul>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                    <div className="block-content block-content-full pt-30">
                                        <table className="table table-vcenter js-dataTable-full">
                                            <thead>
                                                <tr>
                                                    <th className="text-black"><b>#</b></th>
                                                    <th className="text-black"><b>Name</b></th>
                                                    <th className="text-black"><b>Email</b></th>
                                                    <th className="text-black"><b>Phone Number</b></th>

                                                    <th className="text-black text-right"><b>Action</b></th>
                                                </tr>
                                            </thead>
                                            <tbody>


                                                {
                                                    serviceList.map((service, index) => {
                                                        return (
                                                            <tr>
                                                                <td className="">{index + 1}</td>
                                                                <td className="font-w600">{service && service.name}</td>
                                                                <td className="font-w600">{service && service.email}</td>
                                                                <td className="font-w600">{service && service.phoneNumber}</td>
                                                                <td className="text-right"><div class="btn-group">
                                                                    <button type="button" class="btn btn-sm btn-secondary js-tooltip-enabled" data-toggle="tooltip" title="Edit" onClick={this.goToEdit.bind(this, service && service._id)} data-original-title="Edit">
                                                                        <i class="fa fa-pencil"></i>
                                                                    </button>
                                                                    <button type="button" class="btn btn-sm btn-secondary js-tooltip-enabled" data-toggle="tooltip" title="Delete" onClick={() => {
                                                                        this.setState({
                                                                            deleteId: service && service._id
                                                                        })
                                                                    }} data-original-title="Delete">
                                                                        <i class="fa fa-times"></i>
                                                                    </button>
                                                                </div></td>
                                                            </tr>
                                                        )

                                                    })

                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <DeleteModal
                            isOpen={this.state.deleteId ? true : false}
                            onCancel={() => {
                                this.setState({ deleteId: null });
                            }}
                            onSubmit={() => {
                                SessionActions
                                    .deleteUser(this.state.deleteId, (err, res) => {
                                        if (!err) {
                                            this.setState({
                                                deleteId: null
                                            }, () => {
                                                this.fetchService()
                                            })
                                        }
                                        else {
                                            this.setState({
                                                deleteId: null
                                            }, () => {
                                                this.fetchService()
                                                toast.notify(err.message, {
                                                    duration: 3000
                                                });
                                            })
                                        }
                                    })
                            }}
                        />
                    </div>

                </main>
            </div>
        );
    }
}

export default ServiceList;