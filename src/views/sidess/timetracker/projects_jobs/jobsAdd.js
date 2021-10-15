import React, { useEffect, useState } from "react";
import { CButton, CCol, CForm, CRow, CFormGroup, CLabel, CInput, CCard, CCardBody, CTextarea,CToast, CToaster, CToastHeader  } from "@coreui/react";
import "../../../../views/styles.css";
import Select from "react-select";
import Axios from "axios";
import {projects,users} from "../../organization/Services/employeeAdd.services";


var queryJobId = "";

const JobsAdd = (props) => {

    useEffect(() => {
        const query = props.location.search;
        var querySplit = query.split("=");
        queryJobId = querySplit[1];
        editJob(queryJobId);
        projects().then(res => {
            var datas = [];
            {res.data.map(data => {
                datas.push({
                    "label": data.projectName,
                    "value": data.projectName
                })
            })}
            setProjectsList(datas);
        })

        users().then(res => {
            var datas = [];
            {res.data.data.map(data => {
                datas.push({
                    "label": data.firstName + '-' + data.employeeID,
                    "value": data.firstName + '-' + data.employeeID
                })
            })}
            setAssigneesList(datas);
        })
    },[])

    const [selectedAssigneesValue, setSelectedAssigneesValue] = useState([]);
    const [projectsList,setProjectsList] = useState([]);
    const [assigneesList, setAssigneesList] = useState([]);
    const [workItem, setWorkItem] = useState([{"value": ""}]);
    const [billingList, setBillingList] = useState([
        {
            "label": "Billable",
            "value": "Billable",
        },
        {
            "label": "Non-Billable",
            "value": "Non-Billable",
        }])

    const [errors, setErrors] = useState({})
    const [toaster, setToaster] = useState({
        "position": "top-right",
        "show": false,
        "fade": false,
        "autohide": "5000"
    })

    const [resMsg,setResMsg] = useState("");

    const [jobData,setJobData] = useState({
        jobName: "",
        project: "",
        startDate: "",
        endDate: "",
        hours: "",   
        ratePerHour: "",
        description: "",
        billingStatus: ""
    })   

    const inputChange = (e) => {
        setJobData({ ...jobData, [e.target.name]: e.target.value });
    }

    const selectChange = (e, name) => {
        setJobData({ ...jobData, [name]: e.value });
    }

    const multiSelectChange = (e) => {
        setSelectedAssigneesValue(Array.isArray(e) ? e.map(x => x.value) : []);  
    }

    const editJob = (queryJobId) => {
        if(queryJobId) {
            Axios.get('http://localhost:4000/api/job/edit?jobId=' + `${queryJobId}`)
            .then((res) => {
                setJobData({
                    jobName: res.data.jobName,
                    project: res.data.project,
                    startDate: res.data.startDate,
                    endDate: res.data.endDate,
                    hours: res.data.hours,  
                    ratePerHour: res.data.ratePerHour,
                    description: res.data.description,
                    billingStatus: res.data.billingStatus
                })
                setSelectedAssigneesValue(res.data.assignees);
                setWorkItem(res.data.workItem);
            })
        }
    }

    const jobSave = (event) => {
        var jobDetails = {
            jobName: jobData.jobName,
            project: jobData.project,
            startDate: jobData.startDate,
            endDate: jobData.endDate,
            hours: jobData.hours,
            assignees: selectedAssigneesValue,
            ratePerHour: jobData.ratePerHour,
            description: jobData.description,
            billingStatus: jobData.billingStatus,
            workItem: workItem
        }

        validations(event)
        if(queryJobId == undefined) {
            Axios.post('http://localhost:4000/api/job/add', jobDetails)
            .then(res => {
                if (res.data) {
                    console.log(res);
                    setResMsg(res.data.msg);
                    setToaster({ show: true, fade: true, autohide: "5000" })
                }
                clearForm()
            })
        } else {
            Axios.put('http://localhost:4000/api/job/update?jobId=' + `${queryJobId}`, jobDetails)
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
        let jobName = jobData.jobName
        var error = {};
        if (jobName === "") {
            error.jobNameError = "Job Name is required."
            setErrors(error)
        } else {
            error.jobNameError = ""
            setErrors(error)
        }
    }

    const clearForm = () => {
        setJobData({
            jobName: "",
            project: "",
            startDate: "",
            endDate: "",
            hours: "",   
            ratePerHour: "",
            description: "",
            billingStatus: ""
        })
        setWorkItem([{"value": ""}]);
        setSelectedAssigneesValue([]);
    }

    const addWorkItem = () => {
        const values = [...workItem];
        values.push({"value": ""})
        setWorkItem(values);
        console.log(workItem);
    }

    const removeWorkItem = (i,e) => {
        const values = [...workItem];
        if(values.length !== 1) {
            values.splice(i,1);
        }
        setWorkItem(values);
    }

    const changeWorkItem = (i,e) => {
        const values = [...workItem];
        values[i][e.target.name] = e.target.value;
        setWorkItem(values);
    }



    return (
        <>
            <CRow>
                <CCol md={10}>

                </CCol>
                <CCol md={2}>
                    <a className="anchor" href="/#/timetracker/jobs/list"><CButton block color="info">Job List</CButton></a><br/>
                </CCol>
            </CRow>
            <CToaster position={toaster.position}>
                <CToast show={toaster.show} autohide={toaster.autohide} fade={toaster.fade}>
                    <CToastHeader closeButton="true">{resMsg}</CToastHeader>
                </CToast>
            </CToaster>
            <CForm onSubmit={(e) => {jobSave(e)}}>
                <CRow>
                    <CCol xs="12" sm="12" md="12">
                        <CCard>
                            <CCardBody>
                                <b><h5>Job Configuration Details</h5></b>
                                <div className="pl-4">
                                    <CFormGroup row>
                                        <CCol md="8">
                                            <div className="input_label_div_req">
                                                <CRow>
                                                    <CCol md="3">
                                                        <CLabel className="input_label">Job Name</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <CInput className="input_text" id="jobName" name="jobName" value={jobData.jobName} onChange={(e) => { inputChange(e) }} />
                                                    </CCol>
                                                </CRow>
                                            </div>
                                        </CCol>
                                    </CFormGroup>
                                    <CRow>
                                        <CCol md="9 offset-2">
                                            {errors.jobNameError ?
                                                (<span className="errorMsg">{errors.jobNameError}</span>) : null}
                                        </CCol>
                                    </CRow>

                                    <CFormGroup row>
                                        <CCol md="8">
                                            <div className="input_label_div">
                                                <CRow>
                                                    <CCol md="3">
                                                        <CLabel className="input_label">Project</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <Select className="input_text" options={projectsList} name="project" id="project" onChange={(e) => { selectChange(e, "project") }} value={projectsList.filter(function (option) { return option.value === jobData.project; })} />
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
                                                        <CLabel className="input_label">Start Date</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <CInput className="input_text" type="date" id="startDate" name="startDate" value={jobData.startDate} onChange={(e) => { inputChange(e) }} />
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
                                                        <CLabel className="input_label">End Date</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <CInput className="input_text" type="date" id="endDate" name="endDate" value={jobData.endDate} onChange={(e) => { inputChange(e) }} />
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
                                                        <CLabel className="input_label">Hours</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                    <CInput className="input_text" id="hours" name="hours" value={jobData.hours} onChange={(e) => { inputChange(e) }} />
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
                                                        <CLabel className="input_label">Assignees</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <Select className="input_text" isMulti isClearable  options={assigneesList} name="assignees" id="assignees" onChange={(e) => {multiSelectChange(e,"assignees")}} value={assigneesList.filter(obj => selectedAssigneesValue.includes(obj.value))}  />
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
                                                        <CLabel className="input_label">Rate Per Hour</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                    <CInput className="input_text" id="ratePerHour" name="ratePerHour" value={jobData.ratePerHour} onChange={(e) => { inputChange(e) }} />
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
                                                        <CInput className="input_text" id="description" name="description" value={jobData.description} onChange={(e) => { inputChange(e) }} />
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
                                                        <CLabel className="input_label">Billing Status</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <Select className="input_text" options={billingList} name="billingStatus" id="billingStatus" onChange={(e) => { selectChange(e, "billingStatus") }} value={billingList.filter(function (option) { return option.value === jobData.billingStatus; })} />
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
                                                        <CLabel className="input_label">Work Item</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <CCard>
                                                            <CCardBody>
                                                                {workItem && workItem.map((item,index) => {
                                                                    return(
                                                                        <CRow>
                                                                            <CCol xs="12" md="10" className="pl-1 pb-2">
                                                                                <CInput type="text" name="value" value={item.value} onChange={(e) => {changeWorkItem(index,e)}} />
                                                                            </CCol>

                                                                            <CCol xs="12" md="1" className="pl-1">
                                                                                <a onClick={(e) => {removeWorkItem(index,e)}}><i className="fas fa-minus"></i></a>
                                                                            </CCol>

                                                                            <CCol xs="12" md="1" className="pl-1">
                                                                                <a onClick={(e) => {addWorkItem(e)}}><i className="fas fa-plus"></i></a>
                                                                            </CCol>
                                                                        </CRow>
                                                                    )
                                                                })}
                                                            </CCardBody>
                                                        </CCard>
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
                                        <a className="cancelBtn" href="/#/timetracker/jobs/list"><CButton block color="danger">Cancel</CButton></a>
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




export default JobsAdd;