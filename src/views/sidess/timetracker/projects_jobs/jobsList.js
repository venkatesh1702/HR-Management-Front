import { React, useEffect, useState } from "react";
import { CRow, CCol, CButton,
    CModal,CToast, CToaster, CToastHeader,CModalBody,CModalFooter,CLabel } from '@coreui/react';
import {Table} from "reactstrap";
import Axios from "axios";
import "../../../../views/styles.css";
import DomainPortNumber from "../../domainPortNumber";


var selectedJobId
const JobsList = () => {

    useEffect(() => {
        jobList();
    },[])

    const [jobs,setJobs] = useState([]);
    const [modalOpenClose, setModalOpenClose] = useState(false)
    const [resMsg,setResMsg] = useState("");
    const [toaster, setToaster] = useState({
        "position": "top-right",
        "show": false,
        "fade": false,
        "autohide": "5000"
    })

    const openDeleteModal = (jobId) => {
        selectedJobId = jobId;
        setModalOpenClose(!modalOpenClose)
    }

    const editClick = (jobId) => {
        window.location.href = "/#/timetracker/jobs/add?jobId=" + `${jobId}`;
    }


    async function jobList() {
        let response;
        try {
            response = await Axios.get(DomainPortNumber.server + "/api/job/list")
            setJobs(response.data)
        } catch (error) {
            console.log(error.message)
        }
    }

    async function deleteJob() {
        let response;
        try {
            response = await Axios.delete(DomainPortNumber.server + "/api/job/delete?jobId=" + `${selectedJobId}`)
            setResMsg(response.data.msg);
            setToaster({ show: true, fade: true, autohide: "5000" })
            jobList();
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
                    <a className="anchor" href="/#/timetracker/jobs/add"><CButton block color="info"><i className="fas fa-plus"></i>&nbsp;Add Job</CButton></a><br/>
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
                    <CButton color="info" onClick={(e) => {deleteJob(e)}}>Ok</CButton>{' '}
                </CModalFooter>
            </CModal>
                    
            <CRow>
                <CCol md={12}>
                    <Table striped responsive className="userListTable">
                        <thead>
                            <tr>
                                <th>Job Name</th>
                                <th>Project</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.length && jobs.map((job) => {
                                return(
                                <tr key={job._id}>
                                    <td>{job.jobName}</td>
                                    <td>{job.project}</td>
                                    <td>{job.startDate}</td>
                                    <td>{job.endDate}</td>
                                    <td onClick={(e)=>{editClick(job._id)}}><i className="fa fa-edit"></i></td>
                                    <td onClick={(e)=> {openDeleteModal(job._id)}}><i className="fa fa-trash"></i></td>
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




export default JobsList;