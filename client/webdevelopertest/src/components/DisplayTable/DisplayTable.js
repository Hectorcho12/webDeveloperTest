import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { useContext } from 'react';
import { tableContext} from '../../utils/contexts'
import Pagination from './Pagination'
import { Link } from 'react-router-dom'
import { deleteStudent , getStudentDetails } from '../../api/students'
import ModalObj from '../ModalObj'
import { ModalContext } from '../../utils/contexts'
import { convertModalObj_student } from '../../utils/parseObj'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faUserEdit,
    faUserTimes
} from '@fortawesome/free-solid-svg-icons'

import './DisplayTable.css'
 

export default function DisplayTable() {
    const [display, setDisplay] = useState(false)
    const [modalData, setModalData] = useState(null)

    const {_headers, _data, _currentPage, _setRefresh, _refresh} = useContext(tableContext)

    var numeration = (_currentPage - 1) * 10;

    const DeleteStudent = (objID , student) => {
        deleteStudent(objID)
            .then(() => {
                setModalData([{tag: "Message" , val: `Student ${student} Delete Succesfully`}]);
                setDisplay(true)
                _setRefresh(!_refresh);
            })
            .catch((err) => {
                setModalData([{tag: "Message" , val: err}]);
                setDisplay(true)
            })
    }

    const DisplayStudentData = (ObjID) => {
        getStudentDetails(ObjID)
            .then((res) => {
                setModalData(convertModalObj_student(res));
                setDisplay(true)
            })
            .catch((err) => {
                setModalData([{tag: "Message" , val: err}]);
                setDisplay(true)
            })
    }

    const HeadersObj = () => {
        return <tr>
            <th>#</th>
            {_headers?.map((val, index) => {
            return <th key={index}>{val}</th>
        })}</tr>
    }
 
    return (
        <div className='DisplayTable'>
            <ModalContext.Provider value={{_setDisplay: setDisplay, _display: display, _data: modalData}}>
                <ModalObj/>
            </ModalContext.Provider>

            <Table striped bordered>
                <thead> 
                    <HeadersObj/>
                </thead>
                <tbody>
                {_data?.map((rowVal, rowIndex) => {
                        return (
                            <tr key={rowIndex}>
                                <td>{(rowIndex ) + 1 + numeration }</td>
                                {
                                rowVal.values.map((values , index) => {
                                    return <td key={index}>{values}</td>
                                })}
                                <td><Link to={`/StudentForm/${rowVal.ObjID}`}><FontAwesomeIcon className='tableButton' icon={faUserEdit}/></Link></td>
                                <td><FontAwesomeIcon className='tableButton' onClick={() => DeleteStudent(rowVal.ObjID , rowVal.values)} icon={faUserTimes}/></td>
                                <td><span className='tableButton' onClick={() => DisplayStudentData(rowVal.ObjID)}>Details</span></td>                               
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <Pagination currentPage={1}/>      
        </div>
    )

    
}

