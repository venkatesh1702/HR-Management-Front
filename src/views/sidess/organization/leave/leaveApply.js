import React, { useState } from 'react'
import { CRow, CCol, CCard, CCardBody, CForm, CFormGroup, CLabel, CInput, CTextarea } from '@coreui/react';

const LeaveApply = () => {
    return (
        <>
            <CRow>
                <CCol md="6">
                    <CFormGroup row>
                        <CCol md="12">
                            <div className="input_label_div">
                                <CRow>
                                    <CCol md="3">
                                        <CLabel className="input_label">Emplyoee ID</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput />
                                    </CCol>
                                </CRow>
                            </div>
                        </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                        <CCol md="12">
                            <div className="input_label_div">
                                <CRow>
                                    <CCol md="3">
                                        <CLabel className="input_label">Leave Type</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput />
                                    </CCol>
                                </CRow>
                            </div>
                        </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                        <CCol md="12">
                            <div className="input_label_div">
                                <CRow>
                                    <CCol md="3">
                                        <CLabel className="input_label">Date</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput />
                                    </CCol>
                                </CRow>
                            </div>
                        </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                        <CCol md="12">
                            <div className="input_label_div">
                                <CRow>
                                    <CCol md="3">
                                        <CLabel className="input_label">Team Email ID</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput />
                                    </CCol>
                                </CRow>
                            </div>
                        </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                        <CCol md="12">
                            <div className="input_label_div">
                                <CRow>
                                    <CCol md="3">
                                        <CLabel className="input_label">Reason For Leave</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CTextarea
                                            name="textarea-input"
                                            id="textarea-input"
                                            rows="6"
                                        />
                                    </CCol> 
                                </CRow>
                            </div>
                        </CCol>
                    </CFormGroup>

                </CCol>
            </CRow>
        </>
    )
}

export default LeaveApply;