import React,{useReducer} from 'react';
import axios from 'axios';

import contactContext from "./contactContext";
import contactReducer from "./contactReducer";
 
import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    CLEAR_CONTACTS,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR 
   
} from '../types';

const ContactState = props =>{
      const initialState = {
          contacts :null,
        current :null,
        filtered :null,
        error : null
      }

         const [state,dispatch]=useReducer(contactReducer,initialState);
     // Get Contacts 
          const getContacts = async ()=>{

            try {
              const res = await axios.get('api/contacts');
              dispatch({type:GET_CONTACTS,payload : res.data});
} catch (err) {
               console.log(err);
//  dispatch({type : CONTACT_ERROR,payload:err.response.msg})
 
}   

          }

         // Add Contact

         const addContact = async contact =>{
               const config ={
                    headers :{
                             'Content-Type':'application/json'

                    }

               }
            try {
                           const res = await axios.post('api/contacts',contact,config);
                           dispatch({type:ADD_CONTACT,payload : res.data});
            } catch (err) {

              dispatch({type : CONTACT_ERROR,payload:err.response.msg})
              
            }   
          
           
         }



         // Delete Contact 
         const deleteContact = async id =>{
          try {
             await axios.delete(`api/contacts/${id}`);
            dispatch({type:DELETE_CONTACT,payload : id});
           }  catch (err) {

              dispatch({type : CONTACT_ERROR,payload:err.response.msg})

                  }   
             
         };

         // Set Current Contact 

         const setCurrent = contact =>{
                dispatch({type:SET_CURRENT,payload :contact});

         }

         // Clear Contact 

         const clearCurrent =()=>{
               dispatch({type : CLEAR_CURRENT});

         }

         // Update Contact 

         const updateContact = async contact =>{

          const config ={
            headers :{
                     'Content-Type':'application/json'

            }

       }
    try {
                   const res = await axios.put(`api/contacts/${contact._id}`,contact,config);
                   dispatch({type:  UPDATE_CONTACT ,payload : res.data});
    } catch (err) {

       console.log(err);
      
    }   
  
        
         }

         // Filter Contact 

         const filterContacts = text =>{

          dispatch({type :FILTER_CONTACTS, payload:text})
         }
         
           // clear contact
         const clearContacts = ()=>{
         dispatch({type : CLEAR_CONTACTS});

         }  

         // Clear Filter 
         const clearfilter =()=>{
            dispatch({type:CLEAR_FILTER});
         }

         return(
              <contactContext.Provider
              
              value ={{

                     contacts :state.contacts ,
                     current : state.current,
                     filtered : state.filtered,
                     error : state.error,
                     addContact , deleteContact,clearCurrent,setCurrent,updateContact,filterContacts,
                     clearfilter,getContacts,clearContacts

              }}
              
              >


            {props.children}

              </contactContext.Provider>


         )

}

export default  ContactState ;