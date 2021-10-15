import { React, useEffect, useState } from "react";
import { CRow, CCol, CButton,CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CModal,CToast, CToaster, CToastHeader,CModalBody,CModalFooter,CLabel } from '@coreui/react';
import {Table} from "reactstrap";
import {usersLlist, deleteUser} from "../Services/employeeAdd.services.js";



var selectedUserId;
const EmployeeList = () => {

    useEffect(() => {
        usersLlist().then(res => {
            setUsersData(res);
        })
    },[])

    const [usersData,setUsersData] = useState([]);
    const [modalOpenClose, setModalOpenClose] = useState(false)
    const [resMsg,setResMsg] = useState("");
    const [toaster, setToaster] = useState({
        "position": "top-right",
        "show": false,
        "fade": false,
        "autohide": "5000"
    })

    const openDeleteModal = (userId) => {
        selectedUserId = userId;
        setModalOpenClose(!modalOpenClose)
    }

    const editClick = (userId) => {
        window.location.href = "/#/organization/employee/add?userId=" + `${userId}`;
    }

    const deleteUsers = () => {
        deleteUser(selectedUserId).then(res => {
            if(res.status == "200") {
                setResMsg(res.data.msg);
                console.log(res.data.msg)
                setToaster({ show: true, fade: true, autohide: "5000" })
                usersLlist().then(res => {
                    setUsersData(res);
                })
            }
        })
        setModalOpenClose(!modalOpenClose)
    }



    return (
        <>
            <CRow>
                <CCol md={10}>

                </CCol>
                <CCol md={2}>
                    <a className="inviteUser" href="/#/organization/employee/add"><CButton block color="info"><i className="fas fa-plus"></i>&nbsp;Invite User</CButton></a><br/>
                </CCol>
            </CRow>
            <CToaster position={toaster.position}>
                <CToast show={toaster.show} autohide={toaster.autohide} fade={toaster.fade}>
                    <CToastHeader closeButton="true">{resMsg}</CToastHeader>
                    {/* <CToastBody></CToastBody> */}
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
                    <CButton color="info" onClick={(e) => {deleteUsers(e)}}>Ok</CButton>{' '}
                </CModalFooter>
            </CModal>
                    
            <CRow>
                <CCol md={12}>
                    <Table striped responsive className="userListTable">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Employee ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email Address</th>
                                <th>Department</th>
                                <th>Designation</th>
                                <th>Date of Joining</th>
                                <th>Seating Location</th>
                                <th>Work Phone Number</th>
                                <th>Personal Email Address</th>
                                <th>Address</th>
                                <th>Employee Status</th>
                                <th>Employment Type</th>
                                <th>Source of Hire</th>
                                <th>Marital Status</th>
                                <th>About Me</th>
                                <th>Nick Name</th>
                                <th>Job Description</th>
                                <th>Ask me about/Expertise</th>
                                <th>Date of Exit</th>
                                <th>Gender</th>
                                <th>Age</th>
                                <th>Current Experience</th>
                                <th>PAN</th>
                                <th>Aadhaar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersData.length && usersData.map((user) => {
                                return(
                                <tr key={user._id}>
                                    <td>
                                    <CDropdown className="m-1">
                                        <CDropdownToggle>
                                            <a><i class="fa fa-ellipsis-v" aria-hidden="true"></i></a>
                                        </CDropdownToggle>
                                        <CDropdownMenu>
                                            <CDropdownItem onClick={(e)=>{editClick(user._id)}}>Edit</CDropdownItem>
                                            <CDropdownItem onClick={(e)=> {openDeleteModal(user._id)}}>Delete</CDropdownItem>
                                        </CDropdownMenu>
                                    </CDropdown>
                                    </td>
                                    
                                    <td>{user.employeeID}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.emailId}</td>
                                    <td>{user.department}</td>
                                    <td>{user.designation}</td>
                                    <td>{user.joinDate}</td>
                                    <td>{user.seatingLocation}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td>{user.personalEmailID}</td>
                                    <td>{user.address}</td>
                                    <td>{user.employeeStatus}</td>
                                    <td>{user.employmentType}</td>
                                    <td>{user.sourceofhire}</td>
                                    <td>{user.maritalStatus}</td>
                                    <td>{user.aboutMe}</td>
                                    <td>{user.nickName}</td>
                                    <td>{user.jobDescription}</td>
                                    <td>{user.askMeAboutExpertise}</td>
                                    <td>{user.exitDate}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.age}</td>
                                    <td>{user.currentExp}</td>
                                    <td>{user.panNumber}</td>
                                    <td>{user.aadhaarNumber}</td>
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




export default EmployeeList;