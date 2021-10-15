import React, { useEffect, useState } from "react";
import { CButton, CCol, CForm, CRow, CFormGroup, CLabel, CInput, CCard, CCardBody, CTextarea,CToast, CToaster, CToastHeader  } from "@coreui/react";
import "../../../../views/styles.css";
import Select from "react-select";
import Axios from "axios";
import {clients,users} from "../../organization/Services/employeeAdd.services";


var queryProjectId = "";

const ProjectsAdd = (props) => {


    useEffect(() => {
        const query = props.location.search;
        var querySplit = query.split("=");
        queryProjectId = querySplit[1];
        editProject(queryProjectId);
        clients().then(res => {
            var datas = [];
            {res.data.map(data => {
                datas.push({
                    "label": data.clientName,
                    "value": data.clientName
                })
            })}
            setClientsList(datas);
        })
        
        users().then(res => {
            var datas = [];
            {res.data.data.map(data => {
                datas.push({
                    "label": data.firstName + '-' + data.employeeID,
                    "value": data.firstName + '-' + data.employeeID
                })
            })}
            setProjectHeadList(datas);
            if(queryProjectId == undefined) {
                setProjectData({ ...projectData, projectHead: "Balaji-110000" });
            }
        })
    },[])

    const [selectedManagerValue, setSelectedManagerValue] = useState([]);
    const [selectedUserValue, setSelectedUserValue] = useState([]);

    const [clientsList,setClientsList] = useState([]);
    const [projectHeadList,setProjectHeadList] = useState([]);

    const [errors, setErrors] = useState({})
    const [toaster, setToaster] = useState({
        "position": "top-right",
        "show": false,
        "fade": false,
        "autohide": "5000"
    })

    const [resMsg,setResMsg] = useState("");
    const [projectData,setProjectData] = useState({
        projectName: "",
        clientName: "",
        projectCost: "",
        projectHead: "",
        description: ""
    })
    

    const inputChange = (e) => {
        setProjectData({ ...projectData, [e.target.name]: e.target.value });
    }

    const selectChange = (e, name) => {
        setProjectData({ ...projectData, [name]: e.value });
    }

    const multiSelectChange = (e,name) => {
        if(name == "projectUsers") {
            setSelectedUserValue(Array.isArray(e) ? e.map(x => x.value) : []);
        }
        if(name == "projectManager") {
            setSelectedManagerValue(Array.isArray(e) ? e.map(x => x.value) : []);
        }  
    }

    const editProject = (queryProjectId) => {
        if(queryProjectId) {
            Axios.get('http://localhost:4000/api/project/edit?projectId=' + `${queryProjectId}`)
            .then((res) => {
                console.log(res);
                setProjectData({
                    projectName: res.data.projectName,
                    clientName: res.data.clientName,
                    projectCost: res.data.projectCost,
                    projectHead: res.data.projectHead,
                    description: res.data.description
                })
                setSelectedManagerValue(res.data.projectManager)
                setSelectedUserValue(res.data.projectUsers)
            })
        }
    }

    const projectSave = (event) => {
        var projectDetails = {
            projectName: projectData.projectName,
            clientName: projectData.clientName,
            projectCost: projectData.projectCost,
            projectHead: projectData.projectHead,
            projectUsers: selectedUserValue,
            projectManager: selectedManagerValue,
            description: projectData.description
        }

        validations(event)
        if(queryProjectId == undefined) {
            Axios.post('http://localhost:4000/api/project/add', projectDetails)
            .then(res => {
                if (res.data) {
                    console.log(res);
                    setResMsg(res.data.msg);
                    setToaster({ show: true, fade: true, autohide: "5000" })
                }
                clearForm()
            })
        } else {
            Axios.put('http://localhost:4000/api/project/update?projectId=' + `${queryProjectId}`, projectDetails)
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
        let projectName = projectData.projectName
        var error = {};
        if (projectName === "") {
            error.projectNameError = "Project Name is required."
            setErrors(error)
        } else {
            error.projectNameError = ""
            setErrors(error)
        }
    }

    const clearForm = () => {
        setProjectData({
            projectName: "",
            clientName: "",
            projectCost: "",
            projectHead: "",
            description: ""
        })
        setSelectedManagerValue([]);
        setSelectedUserValue([])
    }



    return (
        <>
            <CRow>
                <CCol md={10}>

                </CCol>
                <CCol md={2}>
                    <a className="anchor" href="/#/timetracker/projects/list"><CButton block color="info">Project List</CButton></a><br/>
                </CCol>
            </CRow>
            <CToaster position={toaster.position}>
                <CToast show={toaster.show} autohide={toaster.autohide} fade={toaster.fade}>
                    <CToastHeader closeButton="true">{resMsg}</CToastHeader>
                </CToast>
            </CToaster>
            <CForm onSubmit={(e) => {projectSave(e)}}>
                <CRow>
                    <CCol xs="12" sm="12" md="12">
                        <CCard>
                            <CCardBody>
                                <b><h5>Project</h5></b>
                                <div className="pl-4">
                                    <CFormGroup row>
                                        <CCol md="8">
                                            <div className="input_label_div_req">
                                                <CRow>
                                                    <CCol md="3">
                                                        <CLabel className="input_label">Project Name</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <CInput className="input_text" id="projectName" name="projectName" value={projectData.projectName} onChange={(e) => { inputChange(e) }} />
                                                    </CCol>
                                                </CRow>
                                            </div>
                                        </CCol>
                                    </CFormGroup>
                                    <CRow>
                                        <CCol md="9 offset-2">
                                            {errors.projectNameError ?
                                                (<span className="errorMsg">{errors.projectNameError}</span>) : null}
                                        </CCol>
                                    </CRow>

                                    <CFormGroup row>
                                        <CCol md="8">
                                            <div className="input_label_div_req">
                                                <CRow>
                                                    <CCol md="3">
                                                        <CLabel className="input_label">Client Name</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <Select className="input_text" options={clientsList} name="clientName" id="clientName" onChange={(e) => { selectChange(e, "clientName") }} value={clientsList.filter(function (option) { return option.value === projectData.clientName; })} />
                                                    </CCol>
                                                </CRow>
                                            </div>
                                        </CCol>
                                    </CFormGroup>

                                    <CFormGroup row>
                                        <CCol md="8">
                                            <div className="input_label_div_req">
                                                <CRow>
                                                    <CCol md="3">
                                                        <CLabel className="input_label">Project Cost</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <CInput className="input_text" id="projectCost" name="projectCost" value={projectData.projectCost} onChange={(e) => { inputChange(e) }} />
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
                                                        <CLabel className="input_label">Project Head</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <Select options={projectHeadList} name="projectHead" id="projectHead" onChange={(e) => { selectChange(e, "projectHead") }} value={projectHeadList.filter(function (option) { return option.value === projectData.projectHead; })} />
                                                    </CCol>
                                                </CRow>
                                            </div>
                                        </CCol>
                                    </CFormGroup>
                                    
                                    <CFormGroup row>
                                        <CCol md="8">
                                            <div className="input_label_div_req">
                                                <CRow>
                                                    <CCol md="3">
                                                        <CLabel className="input_label">Project Manager</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <Select className="input_text" isMulti isClearable options={projectHeadList} name="projectManager" id="projectManager" onChange={(e) => {multiSelectChange(e,"projectManager")}} value={projectHeadList.filter(obj => selectedManagerValue.includes(obj.value))} />
                                                    </CCol>
                                                </CRow>
                                            </div>
                                        </CCol>
                                    </CFormGroup>

                                    <CFormGroup row>
                                        <CCol md="8">
                                            <div className="input_label_div_req">
                                                <CRow>
                                                    <CCol md="3">
                                                        <CLabel className="input_label">Project Users</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <Select className="input_text" isMulti isClearable  options={projectHeadList} name="projectUsers" id="projectUsers" onChange={(e) => {multiSelectChange(e,"projectUsers")}} value={projectHeadList.filter(obj => selectedUserValue.includes(obj.value))}  />
                                                    </CCol>
                                                </CRow>
                                            </div>
                                        </CCol>
                                    </CFormGroup>

                                    <CFormGroup row>
                                        <CCol md="8">
                                            <div className="input_label_div_req">
                                                <CRow>
                                                    <CCol md="3">
                                                        <CLabel className="input_label">Description</CLabel>
                                                    </CCol>
                                                    <CCol xs="12" md="9">
                                                        <CInput className="input_text" id="description" name="description" value={projectData.description} onChange={(e) => { inputChange(e) }} />
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
                                        <CButton block color="danger">Cancel</CButton>
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




export default ProjectsAdd;