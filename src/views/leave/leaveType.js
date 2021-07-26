import { CButton, CCard, CCardBody, CCardHeader, CCol, CDataTable, CFormGroup, CInput, CInputRadio, CLabel, CModal, CModalBody, CRow, CSelect, CSwitch } from '@coreui/react';
import React, { useState, useEffect } from 'react'
import axios from 'axios';


const LeaveType = () => {

    const [add_leave_type, set_add_leave_type] = useState(false)
    const [leave_table, set_leave_table] = useState([])

    const [inputField, setInputField] = useState({
        leave_name: '',
        leave_code: '',
        leave_type: '',
        leave_count: '',
        leave_time: ''
    })

    const inputsHandler = (e) => {
        setInputField({ ...inputField, [e.target.name]: e.target.value })
    }

    const SubmitButton = (e) => {
        console.log(inputField);
        axios.post('http://localhost:4000/api/leavetype/add', inputField)
            .then(res => {
                set_add_leave_type(false)
                setInputField({
                    leave_name: '',
                    leave_code: '',
                    leave_type: '',
                    leave_count: '',
                    leave_time: ''
                })
                leave_list()
            })

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

    console.log(leave_table, 'op');


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
                            <CDataTable
                                items={leave_table}
                            />
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
                                                placeholder="leave count" />
                                        </CCol>
                                    </CFormGroup>
                                </CCardBody>
                            </CCard>
                            <CFormGroup row>
                                <CCol md="4">
                                    <CButton block color="success" className="" onClick={SubmitButton}>Save</CButton>
                                </CCol>
                                <CCol md="4">
                                    <CButton block color="danger" className="">Cancel</CButton>
                                </CCol>
                                <CCol md="4">
                                </CCol>
                            </CFormGroup>
                        </div>
                    </div>
                </CModalBody>

            </CModal>
        </div>
    )
}

export default LeaveType;