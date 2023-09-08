import React , {useContext, useEffect, useState} from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactForm =()=>{

    const contactContext= useContext(ContactContext);

    const {addContact,current,clearCurrent,updateContact} = contactContext;
    useEffect(()=>{
               if(current!==null)
               {
                   setContact(current);
               }
               else
               {
                       setContact({
                        name : '',
                        email :'',
                        phone : '',
                        type : 'personal'
                       })
               }


    },[contactContext, current]);

  const [contact, setContact] = useState({
            name : '',
            email :'',
            phone : '',
            type : 'personal'

  });

  const clearAll = ()=>{
      clearCurrent();
  }

  const {name,email,phone,type} = contact;

  const onChange = e => setContact({...contact,[e.target.name]:e.target.value});

  const onSubmit =e =>{
   e.preventDefault();

   if(current ===null)
   {
    addContact(contact);
   }
   else
   {
       updateContact(contact);
   }
  
//    setContact({
//     name : '',
//     email :'',
//     phone : '',
//     type : 'personal'
//    });
    clearAll();
  }

  return (


       <form onSubmit={onSubmit}>
              <h2 className="text-primary"> {current ?"Edit Contact" :"Add Contact"} </h2>
              <input  
                  type="text"
                  placeholder="name"
                  name="name"
                  value={name}
                  onChange={onChange}
              
              
              />
               <input  
                  type="text"
                  placeholder="email"
                  name="email"
                  value={email}
                  onChange={onChange}
              
              
              />
               <input  
                  type="text"
                  placeholder="phone"
                  name="phone"
                  value={phone}
                  onChange={onChange}
              
              
              />
              <h2>Contact Type</h2>
              <input 
              type="radio"
              name="type"
              value="personal"
              checked={type==="personal"}
              onChange={onChange}
               />personal

              <input 
              type="radio"
              name="type"
              value="professional"
              checked={type==="professional"}
              onChange={onChange}
               /> professional 
          <div>
                    <input
                    className="btn btn-primary btn-block"
                    type="submit"
                     value = {current ?"Update Contact" :"Add Contact"} 
                     />
          </div>
          {current && <div>
                <button className="btn btn-light btn-block" onClick={clearAll} > Clear  </button>
              
              
              </div>}
       </form>


  )


}


export default ContactForm;