import React, { useState, useEffect } from 'react';
import Axios from "axios";
import jwt from "jsonwebtoken";
import { CRow, CCol, CCard, CCardBody, CForm, CFormGroup, CLabel, CInput, CButton, CToast, CToaster, CToastHeader, CToastBody } from '@coreui/react';
import "../../../../views/styles.css";
// import emailjs from 'emailjs-com';

let obj = {};
const EmployeeAdd = () => {

    const [empData, setEmpData] = useState({
        "employeeID": "",
        "firstName": "",
        "lastName": "",
        "nickName": "",
        "emailId": "",
        "userId": ""
    })

    const [toaster, setToaster] = useState({
        "position": "top-right",
        "show": false,
        "fade": false,
        "autohide": "3000"
    })

    const [errors,setErrors]= useState({})
    
    const [errorMsg, setErrorMsg] = useState({
        "employeeIDError": false,
        "firstNameError": false,
        "lastNameError": false,
        "emailIdError": false,
        "userIdError": false
    })


    const inputChange = (e) => {
        setEmpData({ ...empData, [e.target.name]: e.target.value });
    }

    const saveUser = (event) => {
        validations(event);
        Axios.post('http://localhost:4000/api/user/add', empData)
            .then(res => {
                if (res.data) {
                    setToaster({ show: true, fade: true, autohide: "3000  " })
                    var payload = { userId: res.data.data._id };
                    var secret = 'fe1a1915a379f3be5394b64d14794932';
                    var token = jwt.sign(payload, secret, { expiresIn: '1m' });

                    var obj = empData
                    obj["userId"] = token
                    // emailjs.send('service_vpnedlb','template_huhw8ij', obj,'user_ee0VjQZ1GpkcPWHOTYM6x')
                    // .then((response) => {
                    //     console.log('SUCCESS!', response.status, response.text);
                    // }, (err) => {
                    // console.log('FAILED...', err);
                    // });   
                    // event.target.reset()
                    clearForm()
                }
            })
        event.preventDefault();
    }

    const clearForm = () => {
        setEmpData({
            "employeeID": "",
            "firstName": "",
            "lastName": "",
            "nickName": "",
            "emailId": ""
        })
    }

    const validations = (event) => {
        let employeeID = empData.employeeID
        let firstName = empData.firstName
        let lastName = empData.lastName
        let emailId = empData.emailId
        var error = {};

        if (employeeID == "") {
            error.employeeIDError = "Employee Id is required."
            setErrors(error)
        } else {
            error.employeeIDError = ""
            setErrors(error)
        }
        if (firstName == "") {
            error.firstNameError = "First name is required."
            setErrors(error)
        } else {
            error.firstNameError = ""
            setErrors(error)
        }
        if (lastName == "") {
            error.lastNameError = "Last name is required."
            setErrors(error)
        } else {
            error.lastNameError = ""
            setErrors(error)
        }
        if (emailId == "") {
            error.emailIdError = "Email address is required."
            setErrors(error)
        } else {
            error.emailIdError = ""
            setErrors(error)
        }
    }


    return (
        <>
            <CRow>
                <CCol xs="12" sm="12" md="12">
                    <CCard>
                        <CCardBody>
                            
                            <CToaster position={toaster.position}>
                                <CToast show={toaster.show} autohide={toaster.autohide} fade={toaster.fade}>
                                    <CToastHeader closeButton="true"></CToastHeader>
                                    <CToastBody>User Created Successfully.</CToastBody>
                                </CToast>
                            </CToaster>
                            <CForm id="myForm" onSubmit={(e) => { saveUser(e) }} className="form-horizontal">
                                <b><h5>Basic Information</h5></b>
                                <CFormGroup row>
                                    <CCol md="6">
                                        <CFormGroup className={errors.employeeIDError?.length > 0 ? "mb-0" : " "} row>
                                            <CCol md="12">
                                                <div className="input_label_div">
                                                    <CRow>
                                                        <CCol md="3">
                                                            <CLabel className="input_label">EmployeeID</CLabel>
                                                        </CCol>
                                                        <CCol xs="12" md="9">
                                                            <CInput className={errors.employeeIDError? "is-invalid input_text": "input_text"} id="employeeID" name="employeeID" value={empData.employeeID} onChange={(e) => { inputChange(e) }} />
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
                                    <CCol md="6">
                                        <CFormGroup className={errors.firstNameError?.length > 0 ? "mb-0" : ""} row>
                                            <CCol md="12">
                                                <div className="input_label_div">
                                                    <CRow>
                                                        <CCol md="3">
                                                            <CLabel className="input_label">First Name</CLabel>
                                                        </CCol>
                                                        <CCol xs="12" md="9">
                                                            <CInput className={errors.firstNameError? "is-invalid input_text": "input_text"} id="firstName" name="firstName" value={empData.firstName} onChange={(e) => { inputChange(e) }} />
                                                        </CCol>
                                                    </CRow>
                                                </div>
                                            </CCol>
                                        </CFormGroup>
                                        {errors.firstNameError ?
                                            (<CRow>
                                                <CCol md="9 offset-3">
                                                    <span className="errorMsg">{errors.firstNameError}</span>
                                                </CCol>
                                            </CRow>) : null}
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol md="6">
                                        <CFormGroup className={errors.lastNameError?.length > 0 ? "mb-0" : ""} row>
                                            <CCol md="12">
                                                <div className="input_label_div">
                                                    <CRow>
                                                        <CCol md="3">
                                                            <CLabel className="input_label">Last Name</CLabel>
                                                        </CCol>
                                                        <CCol xs="12" md="9">
                                                            <CInput className={errors.lastNameError? "is-invalid input_text": "input_text"} id="lastName" name="lastName" value={empData.lastName} onChange={(e) => { inputChange(e) }} />
                                                        </CCol>
                                                    </CRow>
                                                </div>
                                            </CCol>
                                        </CFormGroup>
                                        {errors.lastNameError ?
                                            (<CRow>
                                                <CCol md="9 offset-3">
                                                    <span className="errorMsg">{errors.lastNameError}</span>
                                                </CCol>
                                            </CRow>) : null}
                                    </CCol>
                                    <CCol md="6">
                                        <CFormGroup className={errors.emailIdError?.length > 0 ? "mb-0" : ""} row>
                                            <CCol md="12">
                                                <div className="input_label_div">
                                                    <CRow>
                                                        <CCol md="3">
                                                            <CLabel className="input_label">Email ID</CLabel>
                                                        </CCol>
                                                        <CCol xs="12" md="9">
                                                            <CInput className={errors.emailIdError? "is-invalid input_text": "input_text"} id="emailId" name="emailId" value={empData.emailId} onChange={(e) => { inputChange(e) }} />
                                                        </CCol>
                                                    </CRow>
                                                </div>
                                            </CCol>
                                        </CFormGroup>
                                        {errors.emailIdError ?
                                            (<CRow>
                                                <CCol md="9 offset-3">
                                                    <span className="errorMsg">{errors.emailIdError}</span>
                                                </CCol>
                                            </CRow>) : null}
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol md="6">
                                        <CFormGroup row>
                                            <CCol md="12">
                                                <div className="input_label_div">
                                                    <CRow>
                                                        <CCol md="3">
                                                            <CLabel className="input_label">Nick Name</CLabel>
                                                        </CCol>
                                                        <CCol xs="12" md="9">
                                                            <CInput className="input_text" id="nickName" name="nickName" value={empData.nickName} onChange={(e) => { inputChange(e) }} />
                                                        </CCol>
                                                    </CRow>
                                                </div>
                                            </CCol>
                                        </CFormGroup>
                                    </CCol>
                                </CFormGroup>

                                <CFormGroup row>
                                    <CCol sm="3" md="3 offset-6">
                                        <CButton block color="success" type="submit">Save</CButton>
                                    </CCol>
                                    <CCol sm="3" md="3">
                                        <CButton block color="danger">Cancel</CButton>
                                    </CCol>
                                </CFormGroup>
                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default EmployeeAdd