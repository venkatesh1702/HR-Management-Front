import { React, useEffect, useState } from "react";
import { CRow, CCol, CButton,CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CModal,CToast, CToaster, CToastHeader,CModalBody,CModalFooter,CLabel } from '@coreui/react';
import {Table} from "reactstrap";
import Axios from "axios";
import "../../../../views/styles.css";


var selectedClientId
const ClientsList = () => {

    useEffect(() => {
        ClientList();
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

    const openDeleteModal = (clientId) => {
        selectedClientId = clientId;
        setModalOpenClose(!modalOpenClose)
    }

    const editClick = (clientId) => {
        window.location.href = "/#/timetracker/clients/add?clientId=" + `${clientId}`;
    }


    async function ClientList() {
        let response;
        try {
            response = await Axios.get("http://localhost:4000/api/client/list")
            setUsersData(response.data)
        } catch (error) {
            console.log(error.message)
        }
       

    }

    async function deleteClient() {
        let response;
        try {
            response = await Axios.delete("http://localhost:4000/api/client/delete?clientId=" + `${selectedClientId}`)
            setResMsg(response.data.msg);
            setToaster({ show: true, fade: true, autohide: "5000" })
            ClientList();
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
                    <a className="anchor" href="/#/timetracker/clients/add"><CButton block color="info"><i className="fas fa-plus"></i>&nbsp;Add Client</CButton></a><br/>
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
                    <CButton color="info" onClick={(e) => {deleteClient(e)}}>Ok</CButton>{' '}
                </CModalFooter>
            </CModal>
                    
            <CRow>
                <CCol md={12}>
                    <Table striped responsive className="userListTable">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Client Name</th>
                                <th>Currency Type</th>
                                <th>Billing Method</th>
                                <th>Email Address</th>
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
                                    
                                    <td>{user.clientName}</td>
                                    <td>{user.currency}</td>
                                    <td>{user.billingMethod}</td>
                                    <td>{user.emailId}</td>
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




export default ClientsList;