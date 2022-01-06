import { React, useEffect, useState } from "react";
import { CRow, CCol, CButton,CModal,CToast, CToaster, CToastHeader,CModalBody,CModalFooter,CLabel } from '@coreui/react';
import {Table} from "reactstrap";
import Axios from "axios";
import "../../../../views/styles.css";
import DomainPortNumber from "../../domainPortNumber";


var selectedProjectId
const ProjectsList = () => {

    useEffect(() => {
        ProjectList();
    },[])

    const [projects,setProjects] = useState([]);
    const [modalOpenClose, setModalOpenClose] = useState(false)
    const [resMsg,setResMsg] = useState("");
    const [toaster, setToaster] = useState({
        "position": "top-right",
        "show": false,
        "fade": false,
        "autohide": "5000"
    })

    const openDeleteModal = (projectId) => {
        selectedProjectId = projectId;
        setModalOpenClose(!modalOpenClose)
    }

    const editClick = (projectId) => {
        window.location.href = "/#/timetracker/projects/add?projectId=" + `${projectId}`;
    }


    async function ProjectList() {
        let response;
        try {
            response = await Axios.get(DomainPortNumber.server + "/api/project/list")
            setProjects(response.data)
        } catch (error) {
            console.log(error.message)
        }
    }

    async function deleteProject() {
        let response;
        try {
            response = await Axios.delete(DomainPortNumber.server + "/api/project/delete?projectId=" + `${selectedProjectId}`)
            setResMsg(response.data.msg);
            setToaster({ show: true, fade: true, autohide: "5000" })
            ProjectList();
        } catch (error) {
            console.log(error.message)
        }
        setModalOpenClose(!modalOpenClose)   
    }



    return (
        <>
            <CRow>
                <CCol md={10}>

                </CCol>
                <CCol md={2}>
                    <a className="anchor" href="/#/timetracker/projects/add"><CButton block color="info"><i className="fas fa-plus"></i>&nbsp;Add Project</CButton></a><br/>
                </CCol>
            </CRow>
            <CToaster position={toaster.position}>
                <CToast show={toaster.show} autohide={toaster.autohide} fade={toaster.fade}>
                    <CToastHeader closeButton="true">{resMsg}</CToastHeader>
                </CToast>
            </CToaster>
            <CModal 
                show={modalOpenClose} 
                onClose={() => setModalOpenClose(!modalOpenClose)}>
                
                <CModalBody closeButton>
                    <CRow className="justify-center">
                        <CCol md="5">
                            <CLabel className="input_label text-center">Are you sure want to delete?</CLabel>
                        </CCol>
                    </CRow>
                </CModalBody>
                <CModalFooter className="add_modal">
                    <CButton color="secondary" onClick={() => setModalOpenClose(!modalOpenClose)}>Cancel</CButton>
                    <CButton color="info" onClick={(e) => {deleteProject(e)}}>Ok</CButton>{' '}
                </CModalFooter>
            </CModal>
                    
            <CRow>
                <CCol md={12}>
                    <Table striped responsive className="userListTable">
                        <thead>
                            <tr>
                                <th>Project Name</th>
                                <th>Client Name</th>
                                <th>Project Head</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.length && projects.map((user) => {
                                return(
                                <tr key={user._id}>
                                    <td>{user.projectName}</td>
                                    <td>{user.clientName}</td>
                                    <td>{user.projectHead}</td>
                                    <td onClick={(e)=>{editClick(user._id)}}><i className="fa fa-edit"></i></td>
                                    <td onClick={(e)=> {openDeleteModal(user._id)}}><i className="fa fa-trash"></i></td>
                                </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </CCol>
            </CRow>
        </>
    )
}




export default ProjectsList;