import React , { useState }from 'react'
import MainLayout from '../../layouts/MainLayout'
import FormObj from '../../components/FormObj'
import { withRouter } from 'react-router-dom'

 function StudentForm(props) {
    const { match } = props

    return (
        <div>
            <MainLayout>
                <FormObj ObjId={match.params.id}/>
            </MainLayout>   
        </div>
    )
}

export default withRouter(StudentForm)