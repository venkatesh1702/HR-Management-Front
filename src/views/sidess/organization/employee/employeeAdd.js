import React, { useEffect,useState} from 'react';
import Axios from "axios";
import jwt from "jsonwebtoken";
import { CRow, CCol, CCard, CCardBody, CForm, CFormGroup, CLabel, CInput,
     CButton, CToast, CToaster, CToastHeader, CToastBody ,
    CModal,CModalHeader,CModalBody,CModalTitle,CModalFooter,CInputRadio, CTextarea} from '@coreui/react';
import "../../../../views/styles.css";
// import emailjs from 'emailjs-com';
import emailjs from 'emailjs-com';
import Select from "react-select";
import {users,departments,locations,designations,sourceOfHires,employmentTypes} from  "../Services/employeeAdd.services.js";


let obj = {};
var queryUserId = "";
var usersListApi;

const EmployeeAdd = (props) => {


    useEffect(() => {
        const query = props.location.search;
        var querySplit = query.split("=");
        queryUserId = querySplit[1];
        editUser(queryUserId);
        users().then(res => {
            var datas = [];
            {res.data.data.map(data => {
                datas.push({
                    "label": data.firstName + '-' + data.employeeID,
                    "value": data.firstName
                })
            })}
            setReportingManagerList(datas);
        })
        departments().then(res =>  {
            var datas = [];
            {res.data.data.map(data => {
                datas.push({
                    "label": data.name,
                    "value": data.name
                })
            })}
            setDepartmentList(datas);
        })
        locations().then(res =>  {
            var datas = [];
            {res.data.data.map(data => {
                datas.push({
                    "label": data.name,
                    "value": data.name
                })
            })}
            setLocationList(datas);
        })

        designations().then(res =>  {
            var datas = [];
            {res.data.data.map(data => {
                datas.push({
                    "label": data.name,
                    "value": data.name
                })
            })}
            setDesignationList(datas);
        })

        sourceOfHires().then(res =>  {
            var datas = [];
            {res.data.data.map(data => {
                datas.push({
                    "label": data.name,
                    "value": data.name
                })
            })}
            setSourceofhireList(datas);
        })

        employmentTypes().then(res =>  {
            var datas = [];
            {res.data.data.map(data => {
                datas.push({
                    "label": data.name,
                    "value": data.name
                })
            })}
            setEmploymentTypeList(datas);
        })        
    },[]);

    const editUser = (queryUserId) => {
        if(queryUserId) {
            Axios.get('http://localhost:4000/api/user/edit?userId=' + `${queryUserId}`)
            .then((res) => {
                console.log(res.data.data)
                setEmpData({
                    "employeeID": res.data.data.employeeID,
                    "firstName": res.data.data.firstName,
                    "lastName": res.data.data.lastName,
                    "nickName": res.data.data.nickName,
                    "emailId": res.data.data.emailId,
                    "department" : res.data.data.department,
                    "location": res.data.data.location,
                    "designation" : res.data.data.designation,
                    "sourceofhire" : res.data.data.sourceofhire,
                    "employmentType" : res.data.data.employmentType,
                    "employeeStatus" : res.data.data.employeeStatus,
                    "reportingManager" : res.data.data.reportingManager,
                    "joinDate" : res.data.data.joinDate,
                    "seatingLocation" : res.data.data.seatingLocation,
                    "phoneNumber" : res.data.data.phoneNumber,
                    "currentExp" : res.data.data.currentExp,
                    "personalMobileNumber" : res.data.data.personalMobileNumber,
                    "address" : res.data.data.address,
                    "aadhaarNumber" : res.data.data.aadhaarNumber,
                    "panNumber" : res.data.data.panNumber,
                    "personalEmailID" : res.data.data.personalEmailID,
                    "dob" : res.data.data.dob,
                    "age" : res.data.data.age,
                    "maritalStatus": res.data.data.maritalStatus,
                    "jobDescription" : res.data.data.jobDescription,
                    "aboutMe" : res.data.data.aboutMe,
                    "askMeAboutExpertise" : res.data.data.askMeAboutExpertise,
                    "exitDate" : res.data.data.exitDate,
                    "gender" : res.data.data.gender,
                    "workExperience": res.data.data.workExperience,
                    "educationalDetails": res.data.data.educationalDetails,
                    "dependentDetails": res.data.data.dependentDetails
                })
                setWorkExperience(res.data.data.workExperience)
                setEducationalDetails(res.data.data.educationalDetails)
                setDependentDetails(res.data.data.dependentDetails)
            })
        }
    }

    const [workExperience,setWorkExperience] = useState([{
        "prevCompanyName": "",
        "jobTitle": "",
        "fromDate": "",
        "toDate": "",
        "jobDescription": ""
    }])

    const [educationalDetails,setEducationalDetails] = useState([{
        "instituteName": "",
        "degree": "",
        "specialization": "",
        "completionDate": "",
        "additionalNotes": "",
        "interests": ""
    }])

    const [dependentDetails,setDependentDetails] = useState([{
        "name": "",
        "relationship": "",
        "birthDate": ""
    }])

    const [empData, setEmpData] = useState({
        "employeeID": "",
        "firstName": "",
        "lastName": "",
        "nickName": "",
        "emailId": "",
        "userId": "",
        "department" : "",
        "location": "",
        "designation" : "",
        "sourceofhire" : "",
        "employmentType" : "",
        "employeeStatus" : "",
        "reportingManager" : "",
        "joinDate" : "",
        "seatingLocation" : "",
        "phoneNumber" : "",
        "currentExp" : "",
        "personalMobileNumber" : "",
        "address" : "",
        "aadhaarNumber" : "",
        "panNumber" : "",
        "personalEmailID" : "",
        "dob" : "",
        "age" : "",
        "jobDescription" : "",
        "aboutMe" : "",
        "askMeAboutExpertise" : "",
        "exitDate" : "",
        "gender" : "",
        "maritalStatus": ""
    })

    const [resMsg,setResMsg] = useState("");

    const [toaster, setToaster] = useState({
        "position": "top-right",
        "show": false,
        "fade": false,
        "autohide": "5000"
    })
    

    const [modalOpenClose, setModalOpenClose] = useState(false)
    const [fieldName,setFieldName] = useState("");
    const [fields,setFields] = useState("");
    const [errors,setErrors]= useState({})

    const [departmentList,setDepartmentList] = useState([]);
    const [locationList,setLocationList] = useState([]);
    const [designationList,setDesignationList] = useState([]);
    const [sourceofhireList,setSourceofhireList] = useState([]);
    const [employmentTypeList,setEmploymentTypeList] = useState([]);
    const [reportingManagerList,setReportingManagerList] = useState([]);
    const [empStatus,setEmpStatus] = useState([
        {"label": "Active","value":"Active"},
        {"label": "Terminated","value":"Terminated"},
        {"label": "Deceased","value":"Deceased"},
        {"label": "Resigned","value":"Resigned"}
    ])

    const [gender,setGender] = useState([
        {"label": "Male","value":"Male"},
        {"label": "Female","value":"Female"},
        {"label": "Others","value":"Others"}
    ])

    const [relationship,setRelationship] = useState([
        {"label": "Father","value":"Father"},
        {"label": "Monther","value":"Monther"},
        {"label": "Brother","value":"Brother"},
        {"label": "Sister","value":"Sister"},
        {"label": "Husband","value":"Husband"},
        {"label": "Wife","value":"Wife"},
        {"label": "Child","value":"Child"}
    ])

    const inputChange = (e) => {
        console.log(e.target.value);
        setEmpData({ ...empData, [e.target.name]: e.target.value });
    }

    const selectChange = (e,name) => {
        setEmpData({ ...empData, [name]: e.value });
        console.log(empData);
    }

    const add_fields_inputChange = (e) => {
        setFields(e.target.value)
    }
    
    const saveUser = (event) => {
        var employeeDetails = {
            "employeeID": empData.employeeID,
            "firstName": empData.firstName,
            "lastName": empData.lastName,
            "nickName": empData.nickName,
            "emailId": empData.emailId,
            "department" : empData.department,
            "location": empData.location,
            "designation" : empData.designation,
            "sourceofhire" : empData.sourceofhire,
            "employmentType" : empData.employmentType,
            "employeeStatus" : empData.employeeStatus,
            "reportingManager" : empData.reportingManager,
            "joinDate" : empData.joinDate,
            "seatingLocation" : empData.seatingLocation,
            "phoneNumber" : empData.phoneNumber,
            "currentExp" : empData.currentExp,
            "personalMobileNumber" : empData.personalMobileNumber,
            "address" : empData.address,
            "aadhaarNumber" : empData.aadhaarNumber,
            "panNumber" : empData.panNumber,
            "personalEmailID" : empData.personalEmailID,
            "dob" : empData.dob,
            "age" : empData.age,
            "maritalStatus": empData.maritalStatus,
            "jobDescription" : empData.jobDescription,
            "aboutMe" : empData.aboutMe,
            "askMeAboutExpertise" : empData.askMeAboutExpertise,
            "exitDate" : empData.exitDate,
            "gender" : empData.gender,
            "workExperience": workExperience,
            "educationalDetails": educationalDetails,
            "dependentDetails": dependentDetails
        }
        validations(event);
        if(queryUserId == undefined) {
            Axios.post('http://localhost:4000/api/user/add', employeeDetails)
                .then(res => {
                    if (res.data) {
                        setResMsg(res.data.msg);
                        setToaster({ show: true, fade: true, autohide: "5000" })
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
                        // window.location.href = "/#/organization/employee/list";
                    }
                })
        } else {
            Axios.put('http://localhost:4000/api/user/update?userId=' + `${queryUserId}`, employeeDetails)
            .then(res => {
                if (res.data) {
                    setResMsg(res.data.msg);
                    setToaster({ show: true, fade: true, autohide: "5000" })
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
                    // window.location.href = "/#/organization/employee/list";
                }
            })
        }
        event.preventDefault();
        
        
    }

    const clearForm = () => {
        setEmpData({
            "employeeID": "",
            "firstName": "",
            "lastName": "",
            "nickName": "",
            "emailId": "",
            "userId": "",
            "department" : "",
            "location": "",
            "designation" : "",
            "sourceofhire" : "",
            "employmentType" : "",
            "employeeStatus" : "",
            "reportingManager" : "",
            "joinDate" : "",
            "seatingLocation" : "",
            "phoneNumber" : "",
            "currentExp" : "",
            "personalMobileNumber" : "",
            "address" : "",
            "aadhaarNumber" : "",
            "panNumber" : "",
            "personalEmailID" : "",
            "dob" : "",
            "age" : "",
            "jobDescription" : "",
            "aboutMe" : "",
            "askMeAboutExpertise" : "",
            "exitDate" : "",
            "gender" : "",
            "maritalStatus": ""
        })
        setWorkExperience([{
            "prevCompanyName": "",
            "jobTitle": "",
            "fromDate": "",
            "toDate": "",
            "jobDescription": ""
        }])
    
        setEducationalDetails([{
            "instituteName": "",
            "degree": "",
            "specialization": "",
            "completionDate": "",
            "additionalNotes": "",
            "interests": ""
        }])
    
        setDependentDetails([{
            "name": "",
            "relationship": "",
            "birthDate": ""
        }])
    }

    const validations = (event) => {
        let employeeID = empData.employeeID
        let firstName = empData.firstName
        let lastName = empData.lastName
        let emailId = empData.emailId
        var error = {};

        if (employeeID === "") {
            error.employeeIDError = "Employee Id is required."
            setErrors(error)
        } else {
            error.employeeIDError = ""
            setErrors(error)
        }
        if (firstName === "") {
            error.firstNameError = "First name is required."
            setErrors(error)
        } else {
            error.firstNameError = ""
            setErrors(error)
        }
        if (lastName === "") {
            error.lastNameError = "Last name is required."
            setErrors(error)
        } else {
            error.lastNameError = ""
            setErrors(error)
        }
        if (emailId === "") {
            error.emailIdError = "Email address is required."
            setErrors(error)
        } else {
            error.emailIdError = ""
            setErrors(error)
        }
    }
    
    const add_field_modal = (e,name) => {
        setFieldName(name);
        setModalOpenClose(!modalOpenClose)
    }

    const saveNewField = (name,value) => {
        let fieldName = name.fieldName.toLowerCase();
        fieldName = fieldName.replace(/ /g,'')
        var fields = {};
        fields["fieldValue"] = value.fields
        Axios.post('http://localhost:4000/api/'+ fieldName +'/add', fields)
        .then(res => {
            setModalOpenClose(!modalOpenClose)
            setResMsg(res.data.msg);
            setToaster({ show: true, fade: true})
            setFieldName("");
            setFields(""); 
        })
    }  
        
    const addWorkExpRow = (e) => {
        var values = [...workExperience];
        values.push({
            "prevCompanyName": "",
            "jobTitle": "",
            "fromDate": "",
            "toDate": "",
            "jobDescription": ""
        })
        setWorkExperience(values);
    }

    const workExpRowChange = (e,index) => {
        const values = [...workExperience];
        values[index][e.target.name] = e.target.value;
        setWorkExperience(values);
    }

    const removeWorkExpRow = (e,index) => {
        const values = [...workExperience];
        if(values.length !== 1) {
            values.splice(index,1);
            setWorkExperience(values);
        }
    }

    const addEduDetailsRow = (e) => {
        const values = [...educationalDetails];
        values.push({
            "instituteName": "",
            "degree": "",
            "specialization": "",
            "completionDate": "",
            "additionalNotes": "",
            "interests": ""
        })
        setEducationalDetails(values);
    }

    const eduDetailsRowChange = (e,index) => {
        const values = [...educationalDetails];
        values[index][e.target.name] = e.target.value;
        setEducationalDetails(values);
    }

    const removeEduDetailsRow = (e,index) => {
        const values = [...educationalDetails];
        if(values.length !== 1) {
            values.splice(index,1);
            setEducationalDetails(values);
        }
    }

    const addDeptDetailsRow = (e) => {
        const values = [...dependentDetails];
        values.push({
            "name": "",
            "relationship": "",
            "birthDate": ""
        })
        setDependentDetails(values);
    }

    const deptDetailsRowChange = (e,index) => {
        const values = [...dependentDetails];
        values[index][e.target.name] = e.target.value;
        setDependentDetails(values);
    }

    const deptDetailsSelectRowChange = (e,index,name) => {
        const values = [...dependentDetails];
        values[index][name] = e.value;
        setDependentDetails(values);
    }

    const removeDeptDetailsRow = (e,index) => {
        const values = [...dependentDetails];
        if(values.length !== 1) {
            values.splice(index,1);
            setDependentDetails(values);
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
                                    <CToastHeader closeButton="true">{resMsg}</CToastHeader>
                                    {/* <CToastBody></CToastBody> */}
                                </CToast>
                            </CToaster>
                            <CModal 
                                show={modalOpenClose} 
                                onClose={() => setModalOpenClose(!modalOpenClose)}
                                color="info"
                                >
                                <CModalHeader closeButton>
                                    <CModalTitle>Add {fieldName}</CModalTitle>
                                </CModalHeader>
                                <CModalBody>
                                    <CRow>
                                        <CCol md="5">
                                            <CLabel className="input_label">{fieldName} Name</CLabel>
                                        </CCol>
                                        <CCol xs="12" md="7">
                                            <CInput className="input_modal" id={fieldName} name={fieldName} value={fields} onChange={(e) => { add_fields_inputChange(e) }} />
                                        </CCol>
                                    </CRow>
                                </CModalBody>
                                <CModalFooter className="add_modal">
                                    <CButton color="secondary" onClick={() => setModalOpenClose(!modalOpenClose)}>Cancel</CButton>
                                    <CButton color="info" onClick={(e) => {saveNewField({fieldName},{fields})}}>Add</CButton>{' '}
                                </CModalFooter>
                            </CModal>
                            
                            <CForm id="userForm" onSubmit={(e) => { saveUser(e) }} className="form-horizontal" autoComplete="off">
                                <b><h4>Basic Information</h4></b>
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

                                <b><h4 className="mt-5">Work Information</h4></b>
                                <CFormGroup row>
                                    <CCol md="6">
                                        <CFormGroup row>
                                            <CCol md="12">
                                                <div className="input_label_div">
                                                    <CRow>
                                                        <CCol md="4">
                                                            <CLabel className="input_label">Department</CLabel>
                                                        </CCol>
                                                        <CCol xs="12" md="7" className="pr-0">
                                                            <Select options={departmentList} name="department" id="department" onChange={(e) => {selectChange(e,"department")}} value={departmentList.filter(function(option) {return option.value === empData.department; })} />
                                                        </CCol>
                                                        <CCol xs="12" md="1" className="pl-1">
                                                            <a onClick={(e) => {add_field_modal(e,'Department')}}><i className="fas fa-plus"></i></a>
                                                        </CCol>
                                                    </CRow>
                                                </div>
                                            </CCol>
                                        </CFormGroup>
                                    </CCol>
                                    <CCol md="6">
                                        <CFormGroup row>
                                            <CCol md="12">
                                                <div className="input_label_div">
                                                    <CRow>
                                                        <CCol md="4">
                                                            <CLabel className="input_label">Location</CLabel>
                                                        </CCol>
                                                        <CCol xs="12" md="7" className="pr-0">
                                                            <Select options={locationList} name="location" id="location" onChange={(e) => {selectChange(e,"location")}} value={locationList.filter(function(option) {return option.value === empData.location; })} />
                                                        </CCol>
                                                        <CCol xs="12" md="1" className="pl-1">
                                                            <a onClick={(e) => {add_field_modal(e,'Location')}}><i className="fas fa-plus"></i></a>
                                                        </CCol>
                                                    </CRow>
                                                </div>
                                            </CCol>
                                        </CFormGroup>
                                    </CCol>
                                    <CCol md="6">
                                        <CFormGroup row>
                                            <CCol md="12">
                                                <div className="input_label_div">
                                                    <CRow>
                                                        <CCol md="4">
                                                            <CLabel className="input_label">Designation</CLabel>
                                                        </CCol>
                                                        <CCol xs="12" md="7" className="pr-0">
                                                            <Select options={designationList} name="designation" id="designation" onChange={(e) => {selectChange(e,"designation")}} value={designationList.filter(function(option) {return option.value === empData.designation; })} />
                                                        </CCol>
                                                        <CCol xs="12" md="1" className="pl-1">
                                                            <a onClick={(e) => {add_field_modal(e,'Designation')}}><i className="fas fa-plus"></i></a>
                                                        </CCol>
                                                    </CRow>
                                                </div>
                                            </CCol>
                                        </CFormGroup>
                                    </CCol>
                                    <CCol md="6">
                                        <CFormGroup row>
                                            <CCol md="12">
                                                <div className="input_label_div">
                                                    <CRow>
                                                        <CCol md="4">
                                                            <CLabel className="input_label">Source of Hire</CLabel>
                                                        </CCol>
                                                        <CCol xs="12" md="7" className="pr-0">
                                                            <Select options={sourceofhireList} name="sourceofhire" id="sourceofhire" onChange={(e) => {selectChange(e,"sourceofhire")}} value={sourceofhireList.filter(function(option) {return option.value === empData.sourceofhire; })} />
                                                        </CCol>
                                                        <CCol xs="12" md="1" className="pl-1">
                                                            <a onClick={(e) => {add_field_modal(e,'Source of Hire')}}><i className="fas fa-plus"></i></a>
                                                        </CCol>
                                                    </CRow>
                                                </div>
                                            </CCol>
                                        </CFormGroup>
                                    </CCol>
                                    <CCol md="6">
                                        <CFormGroup row>
                                            <CCol md="12">
                                                <div className="input_label_div">
                                                    <CRow>
                                                        <CCol md="4">
                                                            <CLabel className="input_label">Employment Type</CLabel>
                                                        </CCol>
                                                        <CCol xs="12" md="7" className="pr-0">
                                                            <Select options={employmentTypeList} name="employmentType" id="employmentType" onChange={(e) => {selectChange(e,"employmentType")}} value={employmentTypeList.filter(function(option) {return option.value === empData.employmentType; })} />
                                                        </CCol>
                                                        <CCol xs="12" md="1" className="pl-1">
                                                            <a onClick={(e) => {add_field_modal(e,'Employment Type')}}><i className="fas fa-plus"></i></a>
                                                        </CCol>
                                                    </CRow>
                                                </div>
                                            </CCol>
                                        </CFormGroup>
                                    </CCol>
                                    <CCol md="6">
                                        <CFormGroup row>
                                            <CCol md="12">
                                                <div className="input_label_div">
                                                    <CRow>
                                                        <CCol md="4">
                                                            <CLabel className="input_label">Employee Status</CLabel>
                                                        </CCol>
                                                        <CCol xs="12" md="8">
                                                            <Select options={empStatus} name="employeeStatus" id="employeeStatus" onChange={(e) => {selectChange(e,"employeeStatus")}} value={empStatus.filter(function(option) {return option.value === empData.employeeStatus; })} />
                                                        </CCol>
                                                    </CRow>
                                                </div>
                                            </CCol>
                                        </CFormGroup>
                                    </CCol>
                                    <CCol md="6">
                                        <CFormGroup row>
                                            <CCol md="12">
                                                <div className="input_label_div">
                                                    <CRow>
                                                        <CCol md="4">
                                                            <CLabel className="input_label text-nowrap">Reporting Manager</CLabel>
                                                        </CCol>
                                                        <CCol xs="12" md="7" className="pr-0">
                                                            <Select options={reportingManagerList} name="reportingManager" id="reportingManager" onChange={(e) => {selectChange(e,"reportingManager")}} value={reportingManagerList.filter(function(option) {return option.value === empData.reportingManager; })}  />
                                                        </CCol>
                                                    </CRow>
                                                </div>
                                            </CCol>
                                        </CFormGroup>
                                    </CCol>
                                    <CCol md="6">
                                        <CFormGroup row>
                                            <CCol md="12">
                                                <div className="input_label_div">
                                                    <CRow>
                                                        <CCol md="4">
                                                            <CLabel className="input_label">Date of Joining</CLabel>
                                                        </CCol>
                                                        <CCol xs="12" md="8">
                                                            <CInput className="input_text" type="date" name="joinDate" id="joinDate" onChange={(e) => {inputChange(e)}} value={empData.joinDate} />
                                                        </CCol>
                                                    </CRow>
                                                </div>
                                            </CCol>
                                        </CFormGroup>
                                    </CCol>
                                    <CCol md="6">
                                        <CFormGroup row>
                                            <CCol md="12">
                                                <div className="input_label_div">
                                                    <CRow>
                                                        <CCol md="4">
                                                            <CLabel className="input_label">Seating Location</CLabel>
                                                        </CCol>
                                                        <CCol xs="12" md="8">
                                                            <CInput type="text" className="input_text" name="seatingLocation" id="seatingLocation" onChange={(e) => {inputChange(e)}} value={empData.seatingLocation}/>
                                                        </CCol>
                                                    </CRow>
                                                </div>
                                            </CCol>
                                        </CFormGroup>
                                    </CCol>
                                   
                                    <CCol md="6">
                                        <CFormGroup row>
                                            <CCol md="12">
                                                <div className="input_label_div">
                                                    <CRow>
                                                        <CCol md="4">
                                                            <CLabel className="input_label text-nowrap">Work Phone Number</CLabel>
                                                        </CCol>
                                                        <CCol xs="12" md="8">
                                                            <CInput className="input_text" type="number" name="phoneNumber" id="phoneNumber" onChange={(e) => {inputChange(e)}} value={empData.phoneNumber} />
                                                        </CCol>
                                                    </CRow>
                                                </div>
                                            </CCol>
                                        </CFormGroup>
                                    </CCol>
                                    <CCol md="6">
                                        <CFormGroup row>
                                            <CCol md="12">
                                                <div className="input_label_div">
                                                    <CRow>
                                                        <CCol md="4">
                                                            <CLabel className="input_label">Current Experience</CLabel>
                                                        </CCol>
                                                        <CCol xs="12" md="8">
                                                            <CInput className="input_text" type="number" name="currentExp" id="currentExp" onChange={(e) => {inputChange(e)}} value={empData.currentExp}/>
                                                        </CCol>
                                                    </CRow>
                                                </div>
                                            </CCol>
                                        </CFormGroup>
                                    </CCol>
                                </CFormGroup>

                                <b><h4 className="mt-5">Personal Details</h4></b>
                                <CFormGroup row>    
                                    <CCol md="6">
                                        <CFormGroup row>
                                            <CCol md="12">
                                                <div className="input_label_div">
                                                    <CRow>
                                                        <CCol md="4">
                                                            <CLabel className="input_label text-nowrap">Mobile Number</CLabel>
                                                        </CCol>
                                                        <CCol xs="12" md="8">
                                                            <CInput className="input_text" type="number" name="personalMobileNumber" id="personalMobileNumber" onChange={(e) => {inputChange(e)}} value={empData.personalMobileNumber} />
                                                        </CCol>
                                                    </CRow>
                                                </div>
                                            </CCol>
                                        </CFormGroup>
                                    </CCol>
                                    <CCol md="6">
                                        <CFormGroup row>
                                            <CCol md="12">
                                                <div className="input_label_div">
                                                    <CRow>
                                                        <CCol md="3">
                                                            <CLabel className="input_label">Address</CLabel>
                                                        </CCol>
                                                        <CCol xs="12" md="9">
                                                            <CTextarea className="input_text" name="address" id="address" onChange={(e) => {inputChange(e)}} value={empData.address} />
                                                        </CCol>
                                                    </CRow>
                                                </div>
                                            </CCol>
                                        </CFormGroup>
                                    </CCol>
                                    <CCol md="6">
                                        <CFormGroup row>
                                            <CCol md="12">
                                                <div className="input_label_div">
                                                    <CRow>
                                                        <CCol md="4">
                                                            <CLabel className="input_label">Aadhaar</CLabel>
                                                        </CCol>
                                                        <CCol xs="12" md="8">
                                                            <CInput className="input_text" type="number" name="aadhaarNumber" id="aadhaarNumber" onChange={(e) => {inputChange(e)}} value={empData.aadhaarNumber} />
                                                        </CCol>
                                                    </CRow>
                                                </div>
                                            </CCol>
                                        </CFormGroup>
                                    </CCol>
                                    <CCol md="6">
                                        <CFormGroup row>
                                            <CCol md="12">
                                                <div className="input_label_div">
                                                    <CRow>
                                                        <CCol md="3">
                                                            <CLabel className="input_label">PAN</CLabel>
                                                        </CCol>
                                                        <CCol xs="12" md="9">
                                                            <CInput className="input_text" type="text" name="panNumber" id="panNumber" onChange={(e) => {inputChange(e)}} value={empData.panNumber} />
                                                        </CCol>
                                                    </CRow>
                                                </div>
                                            </CCol>
                                        </CFormGroup>
                                    </CCol>
                                    <CCol md="6">
                                        <CFormGroup row>
                                            <CCol md="12">
                                                <div className="input_label_div">
                                                    <CRow>
                                                        <CCol md="4">
                                                            <CLabel className="input_label">Personal Email ID</CLabel>
                                                        </CCol>
                                                        <CCol xs="12" md="8">
                                                            <CInput className="input_text" type="email" name="personalEmailID" id="personalEmailID" onChange={(e) => {inputChange(e)}} value={empData.personalEmailID}/>
                                                        </CCol>
                                                    </CRow>
                                                </div>
                                            </CCol>
                                        </CFormGroup>
                                    </CCol>
                                    <CCol md="6">
                                        <CFormGroup row>
                                            <CCol md="12">
                                                <div className="input_label_div">
                                                    <CRow>
                                                        <CCol md="4">
                                                            <CLabel className="input_label">Date of Birth</CLabel>
                                                        </CCol>
                                                        <CCol xs="12" md="8">
                                                            <CInput className="input_text" type="date" name="dob" id="dob" onChange={(e) => {inputChange(e)}} value={empData.dob} />
                                                        </CCol>
                                                    </CRow>
                                                </div>
                                            </CCol>
                                        </CFormGroup>
                                    </CCol>
                                    <CCol md="6">
                                        <CFormGroup row>
                                            <CCol md="12">
                                                <div className="input_label_div">
                                                    <CRow>
                                                        <CCol md="4">
                                                            <CLabel className="input_label">Age</CLabel>
                                                        </CCol>
                                                        <CCol xs="12" md="8">
                                                            <CInput className="input_text" type="text" name="age" id="age" onChange={(e) => {inputChange(e)}} value={empData.age} />
                                                        </CCol>
                                                    </CRow>
                                                </div>
                                            </CCol>
                                        </CFormGroup>
                                    </CCol>
                                    <CCol md="6">
                                        <CFormGroup row>
                                            <CCol md="12">
                                                <div className="input_label_div">
                                                    <CRow>
                                                        <CCol md="4">
                                                            <CLabel className="input_label">Marital Status</CLabel>
                                                        </CCol>
                                                        <CCol md="8">
                                                            <CFormGroup variant="checkbox">
                                                                <CInputRadio className="form-check-input" id="single" name="maritalStatus" checked={empData.maritalStatus === "single"} onChange={(e) => {inputChange(e)}} value="single" />
                                                                <CLabel variant="checkbox" htmlFor="single">Single</CLabel>
                                                            </CFormGroup>
                                                            <CFormGroup variant="checkbox">
                                                                <CInputRadio className="form-check-input" id="married" name="maritalStatus" checked={empData.maritalStatus === "married"} onChange={(e) => {inputChange(e)}} value="married" />
                                                                <CLabel variant="checkbox" htmlFor="married">Married</CLabel>
                                                            </CFormGroup>
                                                        </CCol>
                                                    </CRow>
                                                </div>
                                            </CCol>
                                        </CFormGroup>
                                    </CCol>
                                </CFormGroup>

                                <b><h4 className="mt-5">Summary</h4></b>
                                <CFormGroup row>
                                    <CCol md="6">
                                        <CFormGroup row>
                                            <CCol md="12">
                                                <div className="input_label_div">
                                                    <CRow>
                                                        <CCol md="4">
                                                            <CLabel className="input_label">Job Description</CLabel>
                                                        </CCol>
                                                        <CCol xs="12" md="8">
                                                            <CTextarea className="input_text" name="jobDescription" id="jobDescription" onChange={(e) => {inputChange(e)}} value={empData.jobDescription} />
                                                        </CCol>
                                                    </CRow>
                                                </div>
                                            </CCol>
                                        </CFormGroup>
                                    </CCol>
                                    <CCol md="6">
                                        <CFormGroup row>
                                            <CCol md="12">
                                                <div className="input_label_div">
                                                    <CRow>
                                                        <CCol md="4">
                                                            <CLabel className="input_label">About Me</CLabel>
                                                        </CCol>
                                                        <CCol xs="12" md="8">
                                                            <CTextarea className="input_text" name="aboutMe" id="aboutMe" onChange={(e) => {inputChange(e)}} value={empData.aboutMe} />
                                                        </CCol>
                                                    </CRow>
                                                </div>
                                            </CCol>
                                        </CFormGroup>
                                    </CCol>
                                    <CCol md="6">
                                        <CFormGroup row>
                                            <CCol md="12">
                                                <div className="input_label_div">
                                                    <CRow>
                                                        <CCol md="4">
                                                            <CLabel className="input_label">Ask me about/Expertise</CLabel>
                                                        </CCol>
                                                        <CCol xs="12" md="8">
                                                            <CTextarea className="input_text" name="askMeAboutExpertise" id="askMeAboutExpertise" onChange={(e) => {inputChange(e)}} value={empData.askMeAboutExpertise} />
                                                        </CCol>
                                                    </CRow>
                                                </div>
                                            </CCol>
                                        </CFormGroup>
                                    </CCol>
                                    <CCol md="6">
                                        <CFormGroup row>
                                            <CCol md="12">
                                                <div className="input_label_div">
                                                    <CRow>
                                                        <CCol md="4">
                                                            <CLabel className="input_label">Date of Exit</CLabel>
                                                        </CCol>
                                                        <CCol xs="12" md="8">
                                                            <CInput className="input_text" type="date" name="exitDate" id="exitDate" onChange={(e) => {inputChange(e)}} value={empData.exitDate} />
                                                        </CCol>
                                                    </CRow>
                                                </div>
                                            </CCol>
                                        </CFormGroup>
                                    </CCol>
                                    <CCol md="6">
                                        <CFormGroup row>
                                            <CCol md="12">
                                                <div className="input_label_div">
                                                    <CRow>
                                                        <CCol md="4">
                                                            <CLabel className="input_label">Gender</CLabel>
                                                        </CCol>
                                                        <CCol xs="12" md="8">
                                                            <Select options={gender} name="gender" id="gender" onChange={(e) => {selectChange(e,"gender")}} value={gender.filter(function(option) {return option.value === empData.gender})} />
                                                        </CCol>
                                                    </CRow>
                                                </div>
                                            </CCol>
                                        </CFormGroup>
                                    </CCol>
                                </CFormGroup>

                                <h5 className="float-right mt-5 cursor" onClick={(e) => {addWorkExpRow(e)}}><i className="fas fa-plus"></i></h5>
                                <div><b><h4 className="mt-5">Work Experience</h4></b></div>

                                <CRow>
                                    <CCol>
                                        <CCard>
                                            <CCardBody>
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th className="userTableTh">Previous Company Name</th>    
                                                            <th className="userTableTh">Job Title</th>    
                                                            <th className="userTableTh">From Date</th>    
                                                            <th className="userTableTh">To Date</th>    
                                                            <th className="userTableTh">Job Description</th>     
                                                            <th className="userTableTh"></th>    
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {workExperience && workExperience.map((workExp,index) => {
                                                            return(
                                                                <tr>
                                                                    <td style={{border:"none"}}><CInput className="input_text_normal" type="text" name="prevCompanyName" id="prevCompanyName" value={workExp.prevCompanyName} onChange={(e) => {workExpRowChange(e,index)}} /></td>    
                                                                    <td style={{border:"none"}}><CInput className="input_text_normal" type="text" name="jobTitle" id="jobTitle" value={workExp.jobTitle} onChange={(e) => {workExpRowChange(e,index)}} /></td>    
                                                                    <td style={{border:"none"}}><CInput className="input_text_normal" type="date" name="fromDate" id="fromDate" value={workExp.fromDate} onChange={(e) => {workExpRowChange(e,index)}} /></td>    
                                                                    <td style={{border:"none"}}><CInput className="input_text_normal" type="date" name="toDate" id="toDate" value={workExp.toDate} onChange={(e) => {workExpRowChange(e,index)}} /></td>      
                                                                    <td style={{border:"none"}}><CTextarea style={{height:"34px"}} className="input_text_normal" type="text" name="jobDescription" id="jobDescription" value={workExp.jobDescription} onChange={(e) => {workExpRowChange(e,index)}} /></td>    
                                                                    <td style={{border:"none"}}><h5 className="float-right cursor" onClick={(e) => {removeWorkExpRow(e,index)} }><i className="fas fa-minus"></i></h5></td>
                                                                </tr> 
                                                            )
                                                        })} 
                                                    </tbody>
                                                </table> 
                                            </CCardBody>
                                        </CCard>
                                    </CCol>
                                </CRow>


                                <h5 className="float-right mt-5 cursor" onClick={(e) => {addEduDetailsRow(e)}}><i className="fas fa-plus"></i></h5>
                                <div><b><h4 className="mt-5">Educational Details</h4></b></div>
                                
                                <CRow>
                                    <CCol>
                                        <CCard>
                                            <CCardBody>
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th className="userTableTh">Institute Name</th>    
                                                            <th className="userTableTh">Degree/Diploma</th>    
                                                            <th className="userTableTh">Specialization</th>    
                                                            <th className="userTableTh">Date of Completion</th>    
                                                            <th className="userTableTh">Additional Notes</th>    
                                                            <th className="userTableTh">Interests</th>    
                                                            <th className="userTableTh"></th>    
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {educationalDetails && educationalDetails.map((eduDetails,index) => {
                                                            return(
                                                                <tr>
                                                                    <td style={{border:"none"}}><CInput className="input_text_normal" type="text" name="instituteName" id="instituteName" value={eduDetails.instituteName} onChange={(e) => {eduDetailsRowChange(e,index)}} /></td>    
                                                                    <td style={{border:"none"}}><CInput className="input_text_normal" type="text" name="degree" id="degree" value={eduDetails.degree} onChange={(e) => {eduDetailsRowChange(e,index)}} /></td>    
                                                                    <td style={{border:"none"}}><CInput className="input_text_normal" type="text" name="specialization" id="specialization" value={eduDetails.specialization} onChange={(e) => {eduDetailsRowChange(e,index)}} /></td>    
                                                                    <td style={{border:"none"}}><CInput className="input_text_normal" type="date" name="completionDate" id="completionDate" value={eduDetails.completionDate} onChange={(e) => {eduDetailsRowChange(e,index)}} /></td>      
                                                                    <td style={{border:"none"}}><CTextarea style={{height:"34px"}} className="input_text_normal" type="text" name="additionalNotes" id="additionalNotes" value={eduDetails.additionalNotes} onChange={(e) => {eduDetailsRowChange(e,index)}} /></td>    
                                                                    <td style={{border:"none"}}><CTextarea style={{height:"34px"}} className="input_text_normal" type="text" name="interests" id="interests" value={eduDetails.interests} onChange={(e) => {eduDetailsRowChange(e,index)}} /></td>    
                                                                    <td style={{border:"none"}}><h5 className="float-right cursor" onClick={(e) => {removeEduDetailsRow(e,index)} }><i className="fas fa-minus"></i></h5></td>
                                                                </tr> 
                                                            )
                                                        })} 
                                                    </tbody>
                                                </table> 
                                            </CCardBody>
                                        </CCard>
                                    </CCol>
                                </CRow>

                                <h5 className="float-right mt-5 cursor" onClick={(e) => {addDeptDetailsRow(e)}}><i className="fas fa-plus"></i></h5>
                                <div><b><h4 className="mt-5">Dependent Details</h4></b></div>

                                <CRow>
                                    <CCol>
                                        <CCard>
                                            <CCardBody>
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th className="userTableTh">Name</th>    
                                                            <th className="userTableTh">Relationship</th>    
                                                            <th className="userTableTh">Date of Birth</th>      
                                                            <th className="userTableTh"></th>    
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {dependentDetails && dependentDetails.map((deptDetails,index) => { 
                                                            return(
                                                                <tr>
                                                                    <td style={{border:"none"}}><CInput className="input_text_normal" type="text" name="name" id="name" value={deptDetails.name} onChange={(e) => {deptDetailsRowChange(e,index)}} /></td>    
                                                                    <td style={{border:"none"}}><Select options={relationship} className="input_text_normal" type="text" name="relationship" id="relationship" value={relationship.filter(function(option) {return option.value === deptDetails.relationship })} onChange={(e) => {deptDetailsSelectRowChange(e,index,"relationship")}} /></td>    
                                                                    <td style={{border:"none"}}><CInput className="input_text_normal" type="date" name="birthDate" id="birthDate" value={deptDetails.birthDate} onChange={(e) => {deptDetailsRowChange(e,index)}} /></td>    
                                                                    <td style={{border:"none"}}><h5 className="float-right cursor" onClick={(e) => {removeDeptDetailsRow(e,index)} }><i className="fas fa-minus"></i></h5></td>
                                                                </tr> 
                                                            )
                                                        })} 
                                                    </tbody>
                                                </table> 
                                            </CCardBody>
                                        </CCard>
                                    </CCol>
                                </CRow>

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

export default EmployeeAdd;