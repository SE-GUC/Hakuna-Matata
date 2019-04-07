const axios = require('axios');
const functions = {
    getAllPrograms: async (id) =>{
        const cer = await axios.get('http://localhost:3000/educationalOrganizations/trainingProgram/'+id+'/');
        return cer;
        },
   
        
 getSpecificPrograms:async (id,programId) =>{
        const cer = await axios.get('http://localhost:3000/educationalOrganizations/trainingProgram/'+id+'/'+programId)
         return cer;
         },
     
         
 createPrograms:async (id,data) =>{
        const cer =await axios.post('http://localhost:3000/educationalOrganizations/trainingProgram/'+id,data)
        return cer;
                
         }, 

 deletePrograms: async (id,programId) =>{
         const cer = await axios.delete('http://localhost:3000/educationalOrganizations/trainingProgram/'+id+'/'+programId)
        return cer
                         
         },       
                        
        
updatePrograms : async (id,programId,data) => {
         const cer = await axios.put('http://localhost:3000/educationalOrganizations/trainingProgram/'+id+'/'+programId,data)
        return cer
      
},       
};
module.exports = functions;