import { CButton, CCard, CCardBody, CCardHeader, CCol, CFormGroup, CInput, CInputRadio, CLabel, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow, CSelect, CSwitch } from '@coreui/react';
import React, { useState, useEffect } from 'react'
import axios from 'axios';

var updateId;
const LeaveType = () => {

    const [add_leave_type, set_add_leave_type] = useState(false)
    const [leave_table, set_leave_table] = useState([])
    const [isShow, setIsShow] = useState({ method: 'post' });
    const [modal, setModal] = useState(false)

    const [inputField, setInputField] = useState({
        leave_name: '',
        leave_code: '',
        leave_type: '',
        leave_count: '',
        leave_time: '',
    })

    const inputsHandler = (e) => {
        setInputField({ ...inputField, [e.target.name]: e.target.value })
    }

    const [errors, setErrors] = useState({})


    const handleSubmit = (event) => {
        validations(event)
        let leave = {
            leave_name: inputField.leave_name,
            leave_code: inputField.leave_code,
            leave_type: inputField.leave_type,
            leave_count: inputField.leave_count,
            leave_time: inputField.leave_time,
            leave_status: false
        }

        axios.post('http://localhost:4000/api/leavetype/add', leave)
            .then(res => {
                set_add_leave_type(false)
                setInputField({
                    leave_name: '',
                    leave_code: '',
                    leave_type: '',
                    leave_count: '',
                    leave_time: '',
                    leave_status: false
                })
                leave_list()
            })
    }

    const validations = (event) => {
        let leave_name = inputField.leave_name
        let leave_code = inputField.leave_code
        let leave_type = inputField.leave_type
        let leave_count = inputField.leave_count
        let leave_time = inputField.leave_time
        var error = {};

        if (leave_name === "") {
            error.leave_name_err = "Leave name is required."
            setErrors(error)
        } else {
            error.leave_name_err = ""
            setErrors(error)
        }
        if (leave_code === "") {
            error.leave_code_err = "Leave code is required."
            setErrors(error)
        } else {
            error.leave_code_err = ""
            setErrors(error)
        }
        if (leave_type === "") {
            error.leave_type_err = "Leave type is required."
            setErrors(error)
        } else {
            error.leave_type_err = ""
            setErrors(error)
        }
        if (leave_count === "") {
            error.leave_count_err = "Leave count is required."
            setErrors(error)
        } else {
            error.leave_count_err = ""
            setErrors(error)
        }
        if (leave_time === "") {
            error.leave_time_err = "Leave unit is required"
            setErrors(error)
        } else {
            error.leave_time_err = ""
            setErrors(error)
        }
    }

    function leave_list() {
        axios.get('http://localhost:4000/api/leavetype/list')
            .then(res => {
                set_leave_table(res.data.data)
            });
    }

    useEffect(() => {
        axios.get('http://localhost:4000/api/leavetype/list')
            .then(res => {
                set_leave_table(res.data.data)
            });
    }, []);



    const LeaveStatus = (index) => {

        var ind_row = leave_table[index];
        var queryUserId = ind_row._id
        if (ind_row.leave_status === false) {
            ind_row["leave_status"] = true
        } else {
            ind_row["leave_status"] = false
        }
        axios.put(`http://localhost:4000/api/leavetype/update?leaveId=${queryUserId}`, ind_row)
            .then(res => {
                leave_list()
            })
    }

    const editLeaveType = (id) => {
        console.log(id, "editclcick")
        updateId = id;
        setIsShow(!isShow);
        set_add_leave_type(!add_leave_type)
        axios.get(`http://localhost:4000/api/leavetype/edit?leaveId=${id}`)
            .then(res => {
                let item = res.data.data;
                setInputField({
                    leave_name: item.leave_name,
                    leave_code: item.leave_code,
                    leave_type: item.leave_type,
                    leave_count: item.leave_count,
                    leave_time: item.leave_time,
                    leave_status: item.leave_status
                })
            })
    }

    const deleteModal = (id) => {
        updateId = id;
        setModal(!modal)
    }

    const updateButton = () => {
        let leave = {
            leave_name: inputField.leave_name,
            leave_code: inputField.leave_code,
            leave_type: inputField.leave_type,
            leave_count: inputField.leave_count,
            leave_time: inputField.leave_time,
        }
        console.log('updateId', updateId)
        axios.put(`http://localhost:4000/api/leavetype/update?leaveId=${updateId}`, leave)
            .then(res => {
                set_add_leave_type(false)
                leave_list()
            })
    }


    const deleteLeaveType = (id) => {
        axios.delete(`http://localhost:4000/api/leavetype/delete?leaveId=${id}`)
            .then(res => {
                setModal(!modal);
                leave_list();
            })
    }

    return (
        <div>

            <CFormGroup row>
                <CCol md="11">
                </CCol>
                <CCol md="1">
                    <CButton active block color="info" aria-pressed="true" onClick={() => set_add_leave_type(!add_leave_type)}>Add</CButton>
                </CCol>
            </CFormGroup>

            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardBody>
                            <table className="table">
                                {/* <thead>
                                    <tr>
                                        <th scope="col">Leave Name</th>
                                        <th scope="col">Leave Code</th>
                                        <th scope="col">Leave Type</th>
                                        <th scope="col">Leave Count</th>
                                        <th scope="col">Leave Time</th>
                                        <th scope="col">Appearance</th>
                                    </tr>
                                </thead> */}
                                <tbody>
                                    {
                                        leave_table.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.leave_name}</td>
                                                <td>{item.leave_code}</td>
                                                <td>{item.leave_type}</td>
                                                <td>{item.leave_count}</td>
                                                <td>{item.leave_time}</td>
                                                <td><CSwitch className={'mx-1'} shape={'pill'} color={'success'} size='sm' onClick={() => LeaveStatus(index)} defaultChecked={item.leave_status} /></td>
                                                <td onClick={() => editLeaveType(item._id)}><i style={{cursor:'pointer'}} className="fa fa-edit"></i></td>
                                                <td onClick={() => deleteModal(item._id)}><i  style={{cursor:'pointer'}} className="fa fa-trash"></i></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            <CModal
                show={add_leave_type}
                onClose={() => set_add_leave_type(!add_leave_type)}
            >
                <CModalBody>
                    <div className='row'>
                        <div className='col-md-12'>
                            <CCard>
                                <CCardHeader>
                                    <b>New Leave Type</b>
                                </CCardHeader>
                                <CCardBody>
                                    <CFormGroup row>
                                        <CCol md="3">
                                            <CLabel htmlFor="leave_name">Name</CLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CInput id="leave_name"
                                                type="text"
                                                name="leave_name"
                                                onChange={inputsHandler}
                                                value={inputField.leave_name || ''}
                                                placeholder="leave name" />
                                        </CCol>

                                    </CFormGroup>
                                    {errors.leave_name_err ?
                                        (<CRow>
                                            <CCol md="12 mb-3 text-center">
                                                <span className="errorMsg">{errors.leave_name_err}</span>
                                            </CCol>
                                        </CRow>) : null}
                                    <CFormGroup row>
                                        <CCol md="3">
                                            <CLabel htmlFor="leave_code">Code</CLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CInput id="leave_code"
                                                type="text"
                                                name="leave_code"
                                                onChange={inputsHandler}
                                                value={inputField.leave_code || ''}
                                                placeholder="leave code" />
                                        </CCol>
                                    </CFormGroup>
                                    {errors.leave_code_err ?
                                        (<CRow>
                                            <CCol md="12 mb-3 text-center">
                                                <span className="errorMsg">{errors.leave_code_err}</span>
                                            </CCol>
                                        </CRow>) : null}
                                    <CFormGroup row>
                                        <CCol md="3">
                                            <CLabel htmlFor="leave_type">Leave Type</CLabel>
                                        </CCol>
                                        <CCol md="9">
                                            <CSelect custom type="select"
                                                name="leave_type"
                                                id="leave_type"
                                                onChange={inputsHandler}
                                                value={inputField.leave_type || ''}
                                            >
                                                <option value="paid">Paid</option>
                                                <option value="unpaid">Unpaid</option>
                                            </CSelect>
                                        </CCol>
                                    </CFormGroup>
                                    {errors.leave_type_err ?
                                        (<CRow>
                                            <CCol md="12 mb-3 text-center">
                                                <span className="errorMsg">{errors.leave_type_err}</span>
                                            </CCol>
                                        </CRow>) : null}
                                    <CFormGroup row>
                                        <CCol md="3">
                                            <CLabel>Unit</CLabel>
                                        </CCol>
                                        <CCol md="9">
                                            <CFormGroup variant="custom-radio" inline>
                                                <CInputRadio custom id="days"
                                                    name="leave_time"
                                                    onChange={inputsHandler}
                                                    value="Days" />
                                                <CLabel variant="custom-checkbox" htmlFor="days">Days</CLabel>
                                            </CFormGroup>
                                            <CFormGroup variant="custom-radio" inline>
                                                <CInputRadio custom id="hours"
                                                    name="leave_time"
                                                    onChange={inputsHandler}
                                                    value="Hours" />
                                                <CLabel variant="custom-checkbox" htmlFor="hours">Hours</CLabel>
                                            </CFormGroup>

                                        </CCol>
                                    </CFormGroup>
                                    {errors.leave_time_err ?
                                        (<CRow>
                                            <CCol md="12 mb-3 text-center">
                                                <span className="errorMsg">{errors.leave_time_err}</span>
                                            </CCol>
                                        </CRow>) : null}
                                    <CFormGroup row>
                                        <CCol md="3">
                                            <CLabel htmlFor="leave_count">No.of.Days</CLabel>
                                        </CCol>
                                        <CCol xs="12" md="9">
                                            <CInput id="leave_count"
                                                type="number"
                                                name="leave_count"
                                                onChange={inputsHandler}
                                                value={inputField.leave_count || ''}
                                                placeholder="leave count (Max)" />
                                        </CCol>
                                    </CFormGroup>
                                    {errors.leave_count_err ?
                                        (<CRow>
                                            <CCol md="12 mb-3 text-center">
                                                <span className="errorMsg">{errors.leave_count_err}</span>
                                            </CCol>
                                        </CRow>) : null}
                                </CCardBody>
                            </CCard>
                            <CFormGroup row>
                                <CCol md="4">
                                    {isShow.method === 'post' ?
                                        <CButton block color="success" className="" onClick={() => handleSubmit()}>Save</CButton>
                                        :
                                        <CButton block color="success" className="" onClick={() => updateButton()}>update</CButton>
                                    }
                                </CCol>
                                <CCol md="4">
                                    <CButton block color="danger" className="" onClick={() => set_add_leave_type(!add_leave_type)}>Cancel</CButton>
                                </CCol>
                                <CCol md="4">
                                </CCol>
                            </CFormGroup>
                        </div>
                    </div>
                </CModalBody>

            </CModal>

            <CModal
                show={modal}
                onClose={setModal}
            >
                <CModalHeader closeButton>
                    <CModalTitle>Warning</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    Are You Sure You want to delete ?
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" onClick={() => { deleteLeaveType(updateId) }}>OK</CButton>{' '}
                    <CButton
                        color="secondary"
                        onClick={() => setModal(false)}
                    >Cancel</CButton>
                </CModalFooter>
            </CModal>

        </div>
    )
}

export default LeaveType;