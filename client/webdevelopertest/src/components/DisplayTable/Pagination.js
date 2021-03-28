import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react';
import { tableContext} from '../../utils/contexts'
import {
    faCaretLeft,
    faCaretRight
} from '@fortawesome/free-solid-svg-icons'

import './DisplayTable.css'

export default function Pagination() {
    const {_currentPage, _setCurrectPage, _dataLength, _getTotalDocuments} = useContext(tableContext)

    const backPage = () => {
        if(_currentPage !== 1){
            _setCurrectPage(_currentPage - 1)
        }
    }

    const frontPage = () => {
    
        if(_dataLength >= 10 && (_getTotalDocuments / _currentPage) != 10 ){
            _setCurrectPage(_currentPage + 1)
        }
        
    }

    return (
        <div className='Pagination'>
            <button className='PagButton' onClick={backPage}><FontAwesomeIcon icon={faCaretLeft}/></button>
            <p className='HightLight' >{`Pag #${_currentPage}`}</p>
            <button className='PagButton' onClick={frontPage}><FontAwesomeIcon icon={faCaretRight}/></button>
            <p className='HightLight'>{`Total students: #${_getTotalDocuments}`}</p>
        </div>
    )
}

