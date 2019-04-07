const axios = require('axios');
const functions = {
      
      
       getAllCertificate: async (id) =>{
        const cer = await axios.get('http://localhost:3000/educationalOrganizations/certificate/'+id+'/');
        return cer;
        },

        getSpecificCertificate:async (id,certicateId) =>{
                const cer = await axios.get('http://localhost:3000/educationalOrganizations/certificate/'+id+'/'+certicateId)
                return cer;
        },
       
        createCertificate:async (id,data) =>{
                const cer =await axios.post('http://localhost:3000/educationalOrganizations/certificate/'+id,data)
                return cer;
        
                }, 
         deleteCertificate: async (id,certicateId) =>{
                const cer = await axios.delete('http://localhost:3000/educationalOrganizations/certificate/'+id+'/'+certicateId)
                return cer
                        
                 },       
                

        updateCertificate : async (id,certicateId,data) => {
                const cer = await axios.put('http://localhost:3000/educationalOrganizations/certificate/'+id+'/'+certicateId,data)
                return cer
                },       

     
};
module.exports = functions;