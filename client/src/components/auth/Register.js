import React, { useContext, useEffect, useState } from 'react';

import { useNavigate} from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';



const Register =props =>{

   const alertContext = useContext(AlertContext); 
   const authContext = useContext(AuthContext);
   const Navigate = useNavigate();
   const {setAlert} = alertContext;
   const {register,error,clearError ,isAuthenticated} = authContext;

   useEffect(()=>{

                     if(isAuthenticated)
                     {
                     Navigate('/');
                     }
                     if(error==='A User with this email already exists.')
                     {
                       setAlert(error,'danger');
                       clearError();
                     }
                 
    // eslint-disable-next-line
   },[error ,isAuthenticated,props.history]);
   const [user,setUser] = useState({
         name :'',
         email :'',
         password :'',
         password2 :''


   }); 

   const {name,email,password,password2}=user;

   const onChange= e =>setUser({...user,[e.target.name]:e.target.value});
   const onSubmit = e =>{
        e.preventDefault();
       if(name ===''|| email===''|| password==='')
       {
         setAlert('Please enter all fields ','danger');
       }
       else if (password!==password2)
       {
              setAlert('Password and Confirm Password do not match','danger');

       }
       else
       {
        register({
                name ,
                email,
                password

        });
       }
   }
   return(

           <div className="form-container"> 

           <h1>User Registration</h1>
           <form onSubmit={onSubmit}>
                <div className="form-group">
                   <label htmlFor="name"> Name  </label>
                  <input type="text" name="name" value={name} onChange={onChange} />
                </div>

                <div className="form-group">
                   <label htmlFor="email"> Email  </label>
                  <input type="email" name="email" value={email} onChange={onChange} />
                </div>

                <div className="form-group">
                   <label htmlFor="password"> Password </label>
                  <input type="password" name="password" value={password} onChange={onChange} minLength="6" />
                </div>

                <div className="form-group">
                   <label htmlFor="password2">Cofirm Password </label>
                  <input type="password" name="password2" value={password2} onChange={onChange} minLength="6" />
                </div>

                <input type="submit" value="Register" className="btn btn-primary btn-block"/>


                  

           </form>


           </div>


   )


};


export default Register;