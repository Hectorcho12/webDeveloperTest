import React, { useRef, useState, useEffect } from 'react'
import {Form, Button } from 'react-bootstrap'
import { createStudent, updateStudent, getStudentDetails } from '../../api/students'
import ModalObj from '../ModalObj'
import { ModalContext } from '../../utils/contexts'
import { isEmailValid } from '../../utils/validations'
import { useHistory } from "react-router-dom";


import './FormObj.css'

export default function FormObj(props) {
    const history = useHistory();
    const { ObjId } = props
    const [data, setData] = useState(null);
    const [display, setDisplay] = useState(false)
    const [modalData, setModalData] = useState([])
    const formData = useRef(null);
   
    useEffect( () => {
        if(ObjId){
            getStudentDetails(ObjId)
                .then((res) => {
                    if(res.Success !== false){
                    let date = new Date(res.birthDate)
                    let parseDate = date.toISOString().substring(0, 10);
                    setFormData(res.firstName, res.lastName, parseDate, res.email, res.addres, res.gender);
                    }else{                    
                        setDisplay(true)
                        setModalData([{tag: "Message", val: "The student doesn't was in the list. you will be redirected to student list"}])  
                        setTimeout(() => {
                                history.push("/DisplayStudent");
                        },5000)
                    }
                })
                .catch((err) => {
                    setDisplay(true)
                    setModalData([{tag: "Message", val: err}])
                })
        }
    }, [])
    
       
    useEffect(() => {
        
        if(data !== null){
            
            if(data.FitstName === '' || data.LastName === '' || data.Gender === ''){
                setDisplay(true)
                setModalData([{tag: "Message", val: "please complete the mandatory fields"}])
                return
            }

            /*Update workflow*/
            if(ObjId){
                updateStudent(data,ObjId)
                .then(() => {
                    setDisplay(true)
                    setModalData([{tag: "Message", val: "Student Updated successfully"}])
                })
                .catch((err) => {
                    setDisplay(true)
                    setModalData([{tag: "Message", val: err.message}])
                })
            }else{
            /*Create workflow*/
                createStudent(data)
                .then(() => {
                    setDisplay(true)
                    setModalData([{tag: "Message", val: "Student created successfully"}])
                })
                .catch((err) => {
                    setDisplay(true)
                    setModalData([{tag: "Message", val: err.message}])
                })
            }           
        } 
    }, [data])

    const getformData = () => {
        const form = formData.current
        setData({
            FirstName: form['FistName'].value,
            LastName: form['LastName'].value,
            BirthDate: form['BirthDate'].value,
            Email: form['Email'].value,
            Addres: form['Address'].value,
            Gender: form['formGenderRadios'].value
        })   
    }

    const setFormData = (_FirstName, _LastName, _BirthDate, _Email, _Address, _Gender) => {
        const form = formData.current

        form['FistName'].value = _FirstName
        form['LastName'].value = _LastName
        form['BirthDate'].value = _BirthDate
        form['Email'].value = _Email
        form['Address'].value = _Address
        form['formGenderRadios'].value = _Gender
    }

    const cleanFormData = () => {
        setFormData('','','','','','')
    }

    const handlerValidEmail = (event) => {
        if(!isEmailValid(event.target.value)){
            setDisplay(true)
            setModalData([{tag: "Message", val: "Email format invalid"}])
            event.target.value = '';
        }
    }


return (<div>
            <ModalContext.Provider value={{_setDisplay: setDisplay, _display: display, _data: modalData}}>
                <ModalObj/>
            </ModalContext.Provider>
            <div className='FormObj'>
                <Form ref={formData} > 
                    <Form.Group controlId="FistNameGroup">
                        <Form.Label style={{color: "red"}}>*&nbsp;&nbsp;</Form.Label>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control  type="text" placeholder="Enter your firstname" name='FistName' />
                    </Form.Group>

                    <Form.Group controlId="LastName">
                        <Form.Label style={{color: "red"}}>*&nbsp;&nbsp;</Form.Label>
                        <Form.Label> Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter your lastname" name='LastName'/>
                    </Form.Group>

                    <Form.Group controlId="BirthDay">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control type="date" name='BirthDate'/>
                    </Form.Group>

                    <Form.Group controlId="Email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="Email" placeholder="Enter your email" name='Email' onBlur={handlerValidEmail} />
                    </Form.Group>
                    <Form.Group controlId="Address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Enter your Address" name='Address'/>
                    </Form.Group>
                    <fieldset>
                        <Form.Group>
                            <Form.Label style={{color: "red"}}>*&nbsp;&nbsp;</Form.Label>
                            <Form.Label>Gender</Form.Label>
                            <div>
                                <Form.Check inline
                                type="radio"
                                label="Female"
                                name="formGenderRadios"
                                id="formGenderRadiosFemale"
                                value="F"
                                />
                                <Form.Check inline
                                type="radio"
                                label="Male"
                                name="formGenderRadios"
                                id="formGenderRadiosMale"
                                value="M"
                                />
                            </div>
                        </Form.Group>
                    </fieldset>
                    <Button onClick={getformData} style={{marginRight: "25px", backgroundColor: "rgb(60, 165, 222)"}}>
                        Submit
                    </Button>
                    <Button onClick={cleanFormData} style={{marginRight: "25px", backgroundColor: "rgb(255,141,112)"}}>
                        Cancel
                    </Button>
                </Form>
                
            </div>
        </div>)   
}
