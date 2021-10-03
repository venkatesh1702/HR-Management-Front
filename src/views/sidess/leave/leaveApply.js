import React, { useEffect, useState } from 'react'
import { CRow, CCol, CCard, CCardBody, CForm, CFormGroup, CLabel, CInput, CTextarea, CButton } from '@coreui/react';
import { users } from '../organization/Services/employeeAdd.services';
import { leavetype } from '../leave/service/leave.service';
import Select from "react-select";


const LeaveApply = () => {

    const [userList, setUserList] = useState([])

    const [leaveType, setLeaveType] = useState([])

    const [errors, setErrors] = useState({})

    const [leaveData, setleaveData] = useState({
        "employeeID": "",
        "leaveType": "",
        "fromDate": "",
        "toDate": "",
        "teamEmail": "",
        "reason": ""
    })

    useEffect(() => {
        users().then(res => {
            let response = res.data.data;
            const usersArr = response.map(item => {
                return {
                    "label": item.firstName + '-' + item.employeeID,
                    "value": item.firstName
                }
            });
            setUserList(usersArr)
        })

        leavetype().then(res => {
            let response = res.data.data;
            const leaveTypeArr = response.map(item => {
                return {
                    "label": item.leave_name,
                    "value": item._id
                }
            });
            setLeaveType(leaveTypeArr)
        })

    }, [])

    const inputChange = (e) => {
        setleaveData({ ...leaveData, [e.target.name]: e.target.value });
    }

    const validations = (event) => {
        let employeeID = leaveData.employeeID
        let leaveType = leaveData.leaveType
        let fromDate = leaveData.fromDate
        let toDate = leaveData.toDate
        let teamEmail = leaveData.teamEmail
        let reason = leaveData.reason
        var error = {};

        if (employeeID === "") {
            error.employeeIDError = "Employee Id is required."
            setErrors(error)
        } else {
            error.employeeIDError = ""
            setErrors(error)
        }
        if (leaveType === "") {
            error.leaveTypeError = "leave Type is required."
            setErrors(error)
        } else {
            error.leaveTypeError = ""
            setErrors(error)
        }
        if (fromDate === "") {
            error.fromDateError = "fromDate is required."
            setErrors(error)
        } else {
            error.fromDateError = ""
            setErrors(error)
        }
        if (toDate === "") {
            error.toDateError = "toDate is required."
            setErrors(error)
        } else {
            error.dateError = ""
            setErrors(error)
        }
        if (teamEmail === "") {
            error.teamEmailError = "Email address is required."
            setErrors(error)
        } else {
            error.teamEmailError = ""
            setErrors(error)
        }
        if (reason === "") {
            error.reasonError = "Reason is required."
            setErrors(error)
        } else {
            error.reasonError = ""
            setErrors(error)
        }
    }


    const selectChange = (e, name) => {
        setleaveData({ ...leaveData, [name]: e.value });
        // console.log(leaveData);
    }

    const handleSubmit = (event) => {
        validations(event)
        console.log(leaveData, 'formData');
    }

    return (
        <>
            <CFormGroup row>
                <CCol md="6">
                    <CFormGroup className={errors.employeeIDError?.length > 0 ? "mb-0" : " "} row>
                        <CCol md="12">
                            <div className="input_label_div">
                                <CRow>
                                    <CCol md="4">
                                        <CLabel className="input_label">EmployeeID</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="7" className="pr-0">
                                        <Select options={userList} name="employeeID" id="employeeID" onChange={(e) => { selectChange(e, "employeeID") }} value={userList.filter(function (option) { return option.value === leaveData.employeeID; })} />
                                    </CCol>
                                </CRow>
                            </div>
                        </CCol>
                    </CFormGroup>
                    <CRow>
                        <CCol md="9 offset-3">
                            {errors.employeeIDError ?
                                (<span className="errorMsg">{errors.employeeIDError}</span>) : null}
                        </CCol>
                    </CRow>
                </CCol>
            </CFormGroup>

            <CFormGroup row>
                <CCol md="6">
                    <CFormGroup className={errors.leaveTypeError?.length > 0 ? "mb-0" : " "} row>
                        <CCol md="12">
                            <div className="input_label_div">
                                <CRow>
                                    <CCol md="4">
                                        <CLabel className="input_label">Leave Type</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="7" className="pr-0">
                                        <Select options={leaveType} name="leaveType" id="leaveType" onChange={(e) => { selectChange(e, "leaveType") }} value={leaveType.filter(function (option) { return option.value === leaveData.leaveType; })} />
                                    </CCol>
                                </CRow>
                            </div>
                        </CCol>
                    </CFormGroup>
                    <CRow>
                        <CCol md="9 offset-3">
                            {errors.leaveTypeError ?
                                (<span className="errorMsg">{errors.leaveTypeError}</span>) : null}
                        </CCol>
                    </CRow>
                </CCol>
            </CFormGroup>

            <CFormGroup row>
                <CCol md="6">
                    <CFormGroup className={errors.dateError?.length > 0 ? "mb-0" : " "} row>
                        <CCol md="12">
                            <div className="input_label_div">
                                <CRow>
                                    <CCol md="4">
                                        <CLabel className="input_label">Date</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="7" className="pr-0">
                                        <CRow>
                                            <CCol md="6">
                                                <CInput type="date" id="date-input" name="fromDate" onChange={(e) => { inputChange(e, "fromDate") }} value={leaveData.date} placeholder="From" />
                                            </CCol>
                                            <CCol md="6">
                                                <CInput type="date" id="date-input" name="toDate" onChange={(e) => { inputChange(e, "toDate") }} value={leaveData.date} placeholder="To" />
                                            </CCol>
                                        </CRow>
                                    </CCol>
                                </CRow>
                            </div>
                        </CCol>
                    </CFormGroup>
                    <CRow>
                        <CCol md="9 offset-3">
                            {errors.fromDateError ?
                                (<span className="errorMsg">{errors.fromDateError}</span>) : null}
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol md="9 offset-3">
                            {errors.toDateError ?
                                (<span className="errorMsg">{errors.toDateError}</span>) : null}
                        </CCol>
                    </CRow>
                </CCol>
            </CFormGroup>

            <CFormGroup row>
                <CCol md="6">
                    <CFormGroup className={errors.teamEmailError?.length > 0 ? "mb-0" : " "} row>
                        <CCol md="12">
                            <div className="input_label_div">
                                <CRow>
                                    <CCol md="4">
                                        <CLabel className="input_label">Team Email ID</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="7" className="pr-0">
                                        <CInput name="teamEmail" onChange={(e) => { inputChange(e, "teamEmail") }} value={leaveData.teamEmail} />
                                    </CCol>
                                </CRow>
                            </div>
                        </CCol>
                    </CFormGroup>
                    <CRow>
                        <CCol md="9 offset-3">
                            {errors.teamEmailError ?
                                (<span className="errorMsg">{errors.teamEmailError}</span>) : null}
                        </CCol>
                    </CRow>
                </CCol>
            </CFormGroup>

            <CFormGroup row>
                <CCol md="6">
                    <CFormGroup className={errors.reasonError?.length > 0 ? "mb-0" : " "} row>
                        <CCol md="12">
                            <div className="input_label_div">
                                <CRow>
                                    <CCol md="4">
                                        <CLabel className="input_label">Reason For Leave</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="7" className="pr-0">
                                        <CTextarea
                                            id="textarea-input"
                                            rows="6"
                                            name="reason"
                                            onChange={(e) => { inputChange(e, "reason") }} value={leaveData.reason}
                                        />
                                    </CCol>
                                </CRow>
                            </div>
                        </CCol>
                    </CFormGroup>
                    <CRow>
                        <CCol md="9 offset-3">
                            {errors.reasonError ?
                                (<span className="errorMsg">{errors.reasonError}</span>) : null}
                        </CCol>
                    </CRow>
                </CCol>
            </CFormGroup>

            <CFormGroup row className="pt-4">
                <CCol md="6">
                    <CRow>
                        <CCol md="3">
                            <CButton block color="success" onClick={() => handleSubmit()}>Save</CButton>
                        </CCol>
                        <CCol md="3">
                            <CButton block color="danger">Cancel</CButton>
                        </CCol>
                    </CRow>
                </CCol>
            </CFormGroup>
        </>
    )
}

export default LeaveApply;