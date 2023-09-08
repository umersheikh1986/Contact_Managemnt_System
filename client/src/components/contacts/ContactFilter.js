import React, { useContext,useEffect,useRef } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactFilter = () =>{

    const contactContext = useContext(ContactContext);
    const {filterContacts,clearfilter,filtered} = contactContext;
    const text = useRef('');

    useEffect(()=>{
           if(filtered===null){

             text.current.value ='';
           }

    });

    const onChange =e =>{
       if(text.current.value !==''){
                filterContacts(e.target.value);
       }
       else
       {
           clearfilter();
       }

    } 
    return (

           <form>

           <input ref={text}  type="text" placeholder="Search contact" onChange={onChange}/>


           </form>


    )




}
export default ContactFilter;