const jwt = require('jsonwebtoken');
const config = require('config');

module.exports =function(req,res, next){
   // get the the token from the header
   const token = req.header('x-auth-token');
  // token does not exist
  if(!token){
      return res.status(401).json({ msg:'Authorization denied , token is missing '});
  }
  // verify the token
  try{
          const decoded = jwt.verify(token, config.get('jwtSecret'));
          req.user = decoded.user;
          next();
  }
  catch(err)
  {
      res.status(401).json({msg :'Invalid Token'})

  }
}