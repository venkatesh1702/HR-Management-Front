import React, { useEffect, useState } from "react";
import { CButton, CCol, CForm, CRow, CFormGroup, CLabel, CInput, CCard, CCardBody, CTextarea,CToast, CToaster, CToastHeader  } from "@coreui/react";
import "../../../../views/styles.css";
import Select from "react-select";
import Axios from "axios";
import DomainPortNumber from "../../domainPortNumber";


var queryClientId = "";

const ClientsAdd = (props) => {

    useEffect(() => {
        const query = props.location.search;
        var querySplit = query.split("=");
        queryClientId = querySplit[1];
        editClient(queryClientId);
    },[])

    const [errors, setErrors] = useState({})
    const [currencyList, setCurrencyList] = useState([
        { "label": "USD", "value": "USD" },
        { "label": "INR", "value": "INR" },
        { "label": "EUD", "value": "EUD" }
    ])

    const [toaster, setToaster] = useState({
        "position": "top-right",
        "show": false,
        "fade": false,
        "autohide": "5000"
    })

    const [billingMethods, setbillingMethods] = useState([
        { "label": "Hourly Job Rate", "value": "Hourly Job Rate" },
        { "label": "Hourly User Rate", "value": "Hourly User Rate" },
        { "label": "Hourly User Rate - Jobs", "value": "Hourly User Rate - Jobs" },
        { "label": "Hourly User Rate - Projects", "value": "Hourly User Rate - Projects" }
    ])

    const [resMsg,setResMsg] = useState("");

    const [clientData, setClientData] = useState({
        clientName: "",
        currency: "",
        billingMethod: "",
        emailId: "",
        firstName: "",
        lastName: "",
        phone: "",
        mobileNumber: "",
        fax: "",
        streetAddress: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        industry: "",
        companySize: "0",
        description: ""
    })

    const inputChange = (e) => {
        setClientData({ ...clientData, [e.target.name]: e.target.value });
    }

    const selectChange = (e, name) => {
        setClientData({ ...clientData, [name]: e.value });
    }

    const editClient = (queryClientId) => {
        if(queryClientId) {
            Axios.get(DomainPortNumber.server + '/api/client/edit?clientId=' + `${queryClientId}`)
            .then((res) => {
                setClientData({
                    clientName: res.data.clientName,
                    currency: res.data.currency,
                    billingMethod: res.data.billingMethod,
                    emailId: res.data.emailId,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    phone: res.data.phone,
                    mobileNumber: res.data.mobileNumber,
                    fax: res.data.fax,
                    streetAddress: res.data.streetAddress,
                    city: res.data.city,
                    state: res.data.state,
                    zipCode: res.data.zipCode,
                    country: res.data.country,
                    industry: res.data.industry,
                    companySize: res.data.companySize,
                    description: res.data.description
                })
            })
        }
    }

    const clientSave = (event) => {
        var clientsDetails = {
            clientName: clientData.clientName,
            currency: clientData.currency,
            billingMethod: clientData.billingMethod,
            emailId: clientData.emailId,
            firstName: clientData.firstName,
            lastName: clientData.lastName,
            phone: clientData.phone,
            mobileNumber: clientData.mobileNumber,
            fax: clientData.fax,
            streetAddress: clientData.streetAddress,
            city: clientData.city,
            state: clientData.state,
            zipCode: clientData.zipCode,
            country: clientData.country,
            industry: clientData.industry,
            companySize: clientData.companySize,
            description: clientData.description
        }

        validations(event)
        if(queryClientId == undefined) {
            Axios.post(DomainPortNumber.server + '/api/client/add', clientsDetails)
            .then(res => {
                if (res.data) {
                    setResMsg(res.data.msg);
                    setToaster({ show: true, fade: true, autohide: "5000" })
                }
                clearForm()
            })
        } else {
            Axios.put(DomainPortNumber.server + '/api/client/update?clientId=' + `${queryClientId}`, clientsDetails)
            .then(res => {
                if (res.data) {
                    setResMsg(res.data.msg);
                    setToaster({ show: true, fade: true, autohide: "5000" })
                }
                clearForm()
            })
            
        }
        event.preventDefault();
    }

    const validations = (event) => {
        let clientName = clientData.clientName
        let currencyMethod = clientData.currency
        var error = {};

        if (clientName === "") {
            error.clientNameError = "Client Name is required."
            setErrors(error)
        } else {
            error.clientNameError = ""
            setErrors(error)
        }
        if (currencyMethod === "") {
            error.currencyMethodError = "Select a value for currency."
            setErrors(error)
        } else {
            error.currencyMethodError = ""
            setErrors(error)
        } 
    }

    const clearForm = () => {
        setClientData({
            clientName: "",
            currency: "",
            billingMethod: "",
            emailId: "",
            firstName: "",
            lastName: "",
            phone: "",
            mobileNumber: "",
            fax: "",
            streetAddress: "",
            city: "",
            state: "",
            zipCode: "",
            country: "",
            industry: "",
            companySize: "0",
            description: ""
        })
    }



    return (
        <>
            <CRow>
                <CCol md={10}>

                </CCol>
                <CCol md={2}>
                    <a className="anchor" href="/#/timetracker/clients/list"><CButton block color="info">Client List</CButton></a><br/>
                </CCol>
            </CRow>
            <CToaster position={toaster.position}>
                <CToast show={toaster.show} autohide={toaster.autohide} fade={toaster.fade}>
                    <CToastHeader closeButton="true">{resMsg}</CToastHeader>
                </CToast>
            </CToaster>
            <CForm onSubmit={(e) => {clientSave(e)}}>
                <CRow>
                    <CCol xs="12" sm="12" md="12">
                        <CCard>
                            <CCardBody>
                                
                                <b><h5>Client</h5></b>
                                <div className="pl-4">
                                    <CFormGroup row>
                                        <CCol md="8">
                                            <div className="input_label_div_req">
                                                <CRow>
                                                    <CCol md="3">
                                                        <CLabel className="input_label">Client Name</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <CInput className="input_text" id="clientName" name="clientName" value={clientData.clientName} onChange={(e) => { inputChange(e) }} />
                                                    </CCol>
                                                </CRow>
                                            </div>
                                        </CCol>
                                    </CFormGroup>
                                    <CRow>
                                        <CCol md="9 offset-2">
                                            {errors.clientNameError ?
                                                (<span className="errorMsg">{errors.clientNameError}</span>) : null}
                                        </CCol>
                                    </CRow>

                                    <CFormGroup row>
                                        <CCol md="8">
                                            <div className="input_label_div_req">
                                                <CRow>
                                                    <CCol md="3">
                                                        <CLabel className="input_label">Currency</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <Select className="input_text" options={currencyList} name="currency" id="currency" onChange={(e) => { selectChange(e, "currency") }} value={currencyList.filter(function (option) { return option.value === clientData.currency; })} />
                                                    </CCol>
                                                </CRow>
                                            </div>
                                        </CCol>
                                    </CFormGroup>
                                    <CRow>
                                        <CCol md="9 offset-2">
                                            {errors.currencyMethodError ?
                                                (<span className="errorMsg">{errors.currencyMethodError}</span>) : null}
                                        </CCol>
                                    </CRow>

                                    <CFormGroup row>
                                        <CCol md="8">
                                            <div className="input_label_div">
                                                <CRow>
                                                    <CCol md="3">
                                                        <CLabel className="input_label">Billing Method</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <Select options={billingMethods} name="billingMethod" id="billingMethod" onChange={(e) => { selectChange(e, "billingMethod") }} value={billingMethods.filter(function (option) { return option.value === clientData.billingMethod; })} />
                                                    </CCol>
                                                </CRow>
                                            </div>
                                        </CCol>
                                    </CFormGroup><br />
                                </div>

                                <b><h5>Contacts</h5></b>
                                <div className="pl-4">
                                    <CFormGroup row>
                                        <CCol md="8">
                                            <div className="input_label_div">
                                                <CRow>
                                                    <CCol md="3">
                                                        <CLabel className="input_label">Email Id</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <CInput className="input_text" type="email" id="emailId" name="emailId" value={clientData.emailId} onChange={(e) => { inputChange(e) }} />
                                                    </CCol>
                                                </CRow>
                                            </div>
                                        </CCol>
                                    </CFormGroup>

                                    <CFormGroup row>
                                        <CCol md="8">
                                            <div className="input_label_div">
                                                <CRow>
                                                    <CCol md="3">
                                                        <CLabel className="input_label">First Name</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <CInput className="input_text" id="firstName" name="firstName" value={clientData.firstName} onChange={(e) => { inputChange(e) }} />
                                                    </CCol>
                                                </CRow>
                                            </div>
                                        </CCol>
                                    </CFormGroup>

                                    <CFormGroup row>
                                        <CCol md="8">
                                            <div className="input_label_div">
                                                <CRow>
                                                    <CCol md="3">
                                                        <CLabel className="input_label">Last Name</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <CInput className="input_text" id="lastName" name="lastName" value={clientData.lastName} onChange={(e) => { inputChange(e) }} />
                                                    </CCol>
                                                </CRow>
                                            </div>
                                        </CCol>
                                    </CFormGroup>

                                    <CFormGroup row>
                                        <CCol md="8">
                                            <div className="input_label_div">
                                                <CRow>
                                                    <CCol md="3">
                                                        <CLabel className="input_label">Phone</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <CInput className="input_text" type="number" id="phone" name="phone" value={clientData.phone} onChange={(e) => { inputChange(e) }} />
                                                    </CCol>
                                                </CRow>
                                            </div>
                                        </CCol>
                                    </CFormGroup>

                                    <CFormGroup row>
                                        <CCol md="8">
                                            <div className="input_label_div">
                                                <CRow>
                                                    <CCol md="3">
                                                        <CLabel className="input_label">Mobile</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <CInput className="input_text" type="number" id="mobileNumber" name="mobileNumber" value={clientData.mobileNumber} onChange={(e) => { inputChange(e) }} />
                                                    </CCol>
                                                </CRow>
                                            </div>
                                        </CCol>
                                    </CFormGroup>

                                    <CFormGroup row>
                                        <CCol md="8">
                                            <div className="input_label_div">
                                                <CRow>
                                                    <CCol md="3">
                                                        <CLabel className="input_label">Fax</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <CInput className="input_text" id="fax" name="fax" value={clientData.fax} onChange={(e) => { inputChange(e) }} />
                                                    </CCol>
                                                </CRow>
                                            </div>
                                        </CCol>
                                    </CFormGroup><br />
                                </div>


                                <b><h5>Details</h5></b>
                                <div className="pl-4">
                                    <CFormGroup row>
                                        <CCol md="8">
                                            <div className="input_label_div">
                                                <CRow>
                                                    <CCol md="3">
                                                        <CLabel className="input_label">Street Address</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <CTextarea className="input_text" id="streetAddress" name="streetAddress" value={clientData.streetAddress} onChange={(e) => { inputChange(e) }} />
                                                    </CCol>
                                                </CRow>
                                            </div>
                                        </CCol>
                                    </CFormGroup>

                                    <CFormGroup row>
                                        <CCol md="8">
                                            <div className="input_label_div">
                                                <CRow>
                                                    <CCol md="3">
                                                        <CLabel className="input_label">City</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <CInput className="input_text" id="city" name="city" value={clientData.city} onChange={(e) => { inputChange(e) }} />
                                                    </CCol>
                                                </CRow>
                                            </div>
                                        </CCol>
                                    </CFormGroup>

                                    <CFormGroup row>
                                        <CCol md="8">
                                            <div className="input_label_div">
                                                <CRow>
                                                    <CCol md="3">
                                                        <CLabel className="input_label">State/Province</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <CInput className="input_text" id="state" name="state" value={clientData.state} onChange={(e) => { inputChange(e) }} />
                                                    </CCol>
                                                </CRow>
                                            </div>
                                        </CCol>
                                    </CFormGroup>

                                    <CFormGroup row>
                                        <CCol md="8">
                                            <div className="input_label_div">
                                                <CRow>
                                                    <CCol md="3">
                                                        <CLabel className="input_label">ZIP/PIN Code</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <CInput className="input_text" id="zipCode" name="zipCode" value={clientData.zipCode} onChange={(e) => { inputChange(e) }} />
                                                    </CCol>
                                                </CRow>
                                            </div>
                                        </CCol>
                                    </CFormGroup>

                                    <CFormGroup row>
                                        <CCol md="8">
                                            <div className="input_label_div">
                                                <CRow>
                                                    <CCol md="3">
                                                        <CLabel className="input_label">Country</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <CInput className="input_text" id="country" name="country" value={clientData.country} onChange={(e) => { inputChange(e) }} />
                                                    </CCol>
                                                </CRow>
                                            </div>
                                        </CCol>
                                    </CFormGroup>

                                    <CFormGroup row>
                                        <CCol md="8">
                                            <div className="input_label_div">
                                                <CRow>
                                                    <CCol md="3">
                                                        <CLabel className="input_label">Industry</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <CInput className="input_text" id="industry" name="industry" value={clientData.industry} onChange={(e) => { inputChange(e) }} />
                                                    </CCol>
                                                </CRow>
                                            </div>
                                        </CCol>
                                    </CFormGroup>

                                    <CFormGroup row>
                                        <CCol md="8">
                                            <div className="input_label_div">
                                                <CRow>
                                                    <CCol md="3">
                                                        <CLabel className="input_label">Company Size</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <CInput className="input_text" id="companySize" name="companySize" value={clientData.companySize} onChange={(e) => { inputChange(e) }} />
                                                    </CCol>
                                                </CRow>
                                            </div>
                                        </CCol>
                                    </CFormGroup>

                                    <CFormGroup row>
                                        <CCol md="8">
                                            <div className="input_label_div">
                                                <CRow>
                                                    <CCol md="3">
                                                        <CLabel className="input_label">Description</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <CTextarea className="input_text" id="description" name="description" value={clientData.description} onChange={(e) => { inputChange(e) }} />
                                                    </CCol>
                                                </CRow>
                                            </div>
                                        </CCol>
                                    </CFormGroup>
                                </div>
                            </CCardBody>
                        </CCard>

                        <CCard>
                            <CCardBody>
                                <CFormGroup row>
                                    <CCol sm="3" md="3 offset-6">
                                        <CButton block color="success" type="submit">Save</CButton>
                                    </CCol>
                                    <CCol sm="3" md="3">
                                    <a className="cancelBtn" href="/#/timetracker/clients/list"><CButton block color="danger">Cancel</CButton></a>
                                    </CCol>
                                </CFormGroup>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CForm>

            
        </>
    )
}




export default ClientsAdd;