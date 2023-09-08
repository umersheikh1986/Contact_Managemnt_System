import React,{useReducer} from 'react';

import axios  from 'axios';

import authContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
 
import {
    REGISTER_SUCCESS, 
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERROR 
   
} from '../types';

const AuthState = props =>{
      const initialState = {
        token : localStorage.getItem('token'),
        isAuthenticated : null,
        loading : true ,
        user :null,
        error : null
      }

         const [state,dispatch]=useReducer(authReducer,initialState);
     
     // load user
     const loadUser = async () =>{
     // load token into global header
        if(localStorage.token)
        {
              setAuthToken(localStorage.token);

        }
     try {
          const res = await axios.get('/api/auth');
          dispatch({type : USER_LOADED ,payload :res.data});
      
     } catch (err) {
        dispatch({type : AUTH_ERROR})
     } 

     }

     // register user 

     const register = async formData =>{
        const config = {
              headers:{
                     'Content-Type' :'application/json' 

              }

        }

        try {
              const res = await axios.post('/api/users',formData,config);
              dispatch({type :LOGIN_SUCCESS,payload : res.data });
              loadUser();
        } catch (err) {
           dispatch({type:LOGIN_FAIL,payload:err.response.data.msg});
        }
     }

     // login user 

     const login = async formData =>{
      const config = {
            headers:{
                   'Content-Type' :'application/json' 

            }

      }

      try {
            const res = await axios.post('/api/auth',formData,config);
            dispatch({type :REGISTER_SUCCESS,payload : res.data });
            loadUser();
      } catch (err) {
         dispatch({type:REGISTER_FAIL,payload:err.response.data.msg});
      }
   }

     //logout user 
     const logout =()=> dispatch({type : LOGOUT})


     // clear error 
    const clearError = ()=>dispatch({type:CLEAR_ERROR})


         return(
              <authContext.Provider
              
             value ={{

                token : state.token,
                isAuthenticated : state.isAuthenticated,
                loading : state.loading,
                user :state.user,
                error : state.error,
                register,clearError ,loadUser,login,logout


             }}
              
              >


            {props.children}

              </authContext.Provider>


         )

}

export default  AuthState ;