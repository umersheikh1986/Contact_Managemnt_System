const mongoose = require('mongoose');
const config = require('config');


const db = config.get('mongoURI');

const connectDB = async () =>{
    try{

        await  mongoose.connect(db,{
            useNewUrlParser:true,
         //    useCreateIndex : true,
            useUnifiedTopology:true ,
         //    useFindAndModify:false
     
          
         })
         console.log(`connected to Mongodb`);
    }
    catch(err)
    {
        console.error(err.message);
        process.exit(1);

    }


}

// const connectDB = () =>{




//      mongoose.connect(db,{
//        useNewUrlParser:true,
//     //    useCreateIndex : true,
//        useUnifiedTopology:true ,
//     //    useFindAndModify:false

     
//     })
//    .then(()=>console.log(`Mongodb is connected`))
//     .catch(err =>{
//     console.error(err.message);
//     process.exit(1);
          
// });
    
// };


module.exports = connectDB;