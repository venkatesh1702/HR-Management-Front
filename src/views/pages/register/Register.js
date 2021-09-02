import React, { useState } from 'react';
import Axios from "axios";
import CryptoJS from "crypto-js"; 
import jwt from "jsonwebtoken";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

var decryptedUserId = "";  
const Register = (props) => {

  let queryString = props.location.search;
  let userId = queryString.split("=");

  const [empData,setEmpData] = useState({
    password: "",
    confirmPassword: ""
  })

  const inputChange = (e) => {
    setEmpData({...empData,[e.target.name] : e.target.value});
  }

  const updateUser = (event) => {
    jwt.verify(userId[1], 'fe1a1915a379f3be5394b64d14794932', function(err, decoded) {
      if(err) {
        alert("invitation link expired, contact admin.")
      } else  {
        var decodeUserId = jwt.decode(userId[1], {complete: true});
        decryptedUserId = decodeUserId.payload.userId;
        Axios.put('http://localhost:4000/api/user/update?userId=' + decryptedUserId,empData)
          .then(res => {
          if(res.data) {         
            clearForm()     
          }
        })
        event.preventDefault();
      }
    })
  }


  const clearForm = () => {
    setEmpData({
      password: "",
      confirmPassword: ""
    })
}


  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h6 className="text-muted">Set your account</h6>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" name="password" placeholder="password" value={empData.password}  onChange={(e) => {inputChange(e)}} />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" name="confirmPassword" placeholder="Confirm Password" value={empData.confirmPassword} onChange={(e) => {inputChange(e)}} />
                  </CInputGroup>
                  
                
                  <CButton color="success" onClick={updateUser} block>Update</CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
