import React, { useState, useEffect } from 'react'
import MainLayout from '../../layouts/MainLayout'
import DisplayTable from '../../components/DisplayTable'
import { getStudents, getTotalDocuments } from '../../api/students'
import { tableContext } from '../../utils/contexts'
import { convertTableObj_studentDisplay } from '../../utils/parseObj'


import './DisplayStudent.css';

export default function DisplayStudent() {
    const [headers, setHeaders] = useState(["Student Name", "Update", "Delete", "view Details"])
    const [data, setData] = useState(null)
    const [currectPage, setCurrectPage] = useState(1)
    const [totalDocs, settotalDocs] = useState(0)
    const [refresh, setRefresh] = useState(false)


    useEffect(() => {
        var nreg = currectPage * 10
        getStudents(nreg ,  nreg - 10)
            .then(res => {              
                setData(convertTableObj_studentDisplay(res))
            })
            .catch(err => {
                console.log(err)
            })
    }, [currectPage,refresh])

    useEffect(() =>{
        getTotalDocuments()
            .then((res) => {
                settotalDocs(res)
            })
            .catch((err) => {
                console.log(err)
            })
    },[])

    return (
        <div>
            <MainLayout>
                <tableContext.Provider
                    value={{_headers: headers, 
                            _data: data, 
                            _currentPage: currectPage, 
                            _setCurrectPage: setCurrectPage, 
                            _dataLength: data?.length, 
                            _getTotalDocuments: totalDocs,
                            _refresh: refresh,
                            _setRefresh: setRefresh}}>
                    <DisplayTable/>
                </tableContext.Provider>
            </MainLayout>
        </div>
    )
}
