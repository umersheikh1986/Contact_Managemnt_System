import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';
 const Navbar = ({title,icon})=>{
    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);
   

     const {isAuthenticated,logout,user}= authContext;
     const {clearContacts}= contactContext;
     const onLogout =()=>{
         logout();
        clearContacts();
     }
     const authLinks =(
        <Fragment>
            <li> hello {user && user.name}</li>
           
             <li>     <a onClick={onLogout} href="/login">
                  <i className="fas fa-sign-out-alt"></i>
                  <span className="hide-sm">Logout</span>
                  </a>
              </li>


        </Fragment>

     );

     const guestLink =(
         <Fragment>
                        
                        <Link to='/register'>Register</Link>
                        
                        
                        <Link to='/login'>Login</Link>
                        
         </Fragment>

     );
     return(
                 <nav className="navbar bg-primary">
                  <h1>

                       <i className={icon} /> {title}

                  </h1>
                     <p>
                              {isAuthenticated ? authLinks : guestLink}
                   </p>                    



                 </nav>
     

     )

 }
     Navbar.propTypes ={
      title : PropTypes.string.isRequired,
      icon : PropTypes.string


     }

     Navbar.defaultProps ={
         title : 'Contact Management',
         icon :'fas fa-id-card-alt'
     }

 export default Navbar;