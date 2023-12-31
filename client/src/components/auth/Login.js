import React, { useContext, useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';



   

const Login = (props) =>{

   const alertContext = useContext(AlertContext);
   const authContext = useContext(AuthContext);
  const Navigate = useNavigate();
   const {setAlert} =alertContext;

   const {login,error,clearError,isAuthenticated} = authContext;
   useEffect(()=>{

      if(isAuthenticated)
      {
Navigate('/');
      }
      if(error==='Incorrect Password.')
      {
        setAlert(error,'danger');
        clearError();
      }
     
                 // eslint-disable-next-line
},[error ,isAuthenticated,props.history]);
   const [user,setUser] = useState({
 
         email :'',
         password :'',
      


   }); 

   const {email,password}=user;

   const onChange= (e) =>setUser({...user,[e.target.name]:e.target.value});
   const onSubmit = (e) =>{
        e.preventDefault();
        if(email===''|| password===''){
             setAlert('Please fill the login form. ','danger');

        }
        else
        {
           login({
                email,password

           });
        }

   }
   return(

           <div className="form-container"> 

           <h1>User Login</h1>
           <form onSubmit={onSubmit}>
              

                <div className="form-group">
                   <label htmlFor="email"> Email  </label>
                  <input type="email" name="email" value={email} onChange={onChange} />
                </div>

                <div className="form-group">
                   <label htmlFor="password"> Password </label>
                  <input type="password" name="password" value={password} onChange={onChange} />
                </div>

              

                <input type="submit" value="Login" className="btn btn-primary btn-block"/>


                  

           </form>


           </div>


   )


};


export default Login;