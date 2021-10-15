import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { CButton, CCard, CCardBody, CCol, CRow } from '@coreui/react';
const LeaveList = () => {

    const [leaveListData, setLeaveListData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/api/leavetype/list')
            .then(res => {
                let leave_data = res.data.data;
                let data = [];
                for (var k = 0; k < leave_data.length; k++) {
                    if (leave_data[k].leave_status) {
                        data.push(leave_data[k])
                    }
                }
                setLeaveListData(data)
            });
    }, []);

    const history = useHistory();

    const applyLeave = () =>{
        history.push('/leaveapply');
    }

    return (
        <div>
            <CRow>
                <CCol>
                    <CButton color="info" className="float-right" onClick={applyLeave}>Apply Leave</CButton>
                </CCol>
            </CRow>

            <CRow>
                {leaveListData.map((item, index) => {
                    return (
                        <CCol xs="2 p-2" key={index}>
                            <CCard>
                                <b className='text-center p-3' style={{ textTransform: 'capitalize' }}>{item.leave_name}</b>
                                <CCardBody className="text-center">
                                    <i className="fa fa-stethoscope" style={{ fontSize: '25px', color: 'red' }}></i>
                                </CCardBody>
                                <p className='ml-5'>Available : {item.leave_count}</p>
                                <p className='ml-5'>Booked : 0</p>
                            </CCard>
                        </CCol>
                    )
                })}
            </CRow>

            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardBody>
                            <h5>All leave and holidays</h5>
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td><i className="fa fa-calendar" style={{ fontSize: '14px', color: 'red' }}></i> sep 10 Fri</td>
                                        <td>Ganesh Chathurthi</td>
                                        <td>Ganesh Chathurthi</td>
                                    </tr>
                                </tbody>
                            </table>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

        </div>

    )
}

export default LeaveList;