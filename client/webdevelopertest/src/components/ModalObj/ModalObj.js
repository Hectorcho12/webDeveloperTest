import React, { useState, useEffect, Children } from 'react'
import Modal from 'react-modal';
import { useContext } from 'react';
import { ModalContext} from '../../utils/contexts'

import './ModalObj.css'

export default function ModalObj(props){
    const { children } = props
    const { _setDisplay, _display, _data } = useContext(ModalContext)

    const [modalIsOpen,setIsOpen] = useState(_display);
    
    useEffect(() => {
      setIsOpen(_display)
    }, [props])
   
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
    }
   
    function closeModal(){
      setIsOpen(false);
      _setDisplay(false);
    }

    const customStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)',
          padding               : '50px',
          backgroundColor       : 'rgb(110,205,255)',
          border                : '3px solid rgb(35,147,207)',
          borderRadius          : '20px'
        }
      };
    
      return (
        <div style={{}}>
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            ariaHideApp={false}
          >
            <button className='closeButton' onClick={closeModal}>X</button>
            <div>
              {_data?.map((values, index) => {
                return(
                <span className='modalItems' key={index}>
                  <p className='modalItem'>{`${values.tag}  :`}&nbsp;&nbsp;</p>
                  <p className='hightlight modalItem'>&nbsp;&nbsp;{`${values.val}`}</p>
                </span>)
              })}
            </div>
            {children}
          </Modal>
        </div>
      );
  }
  

