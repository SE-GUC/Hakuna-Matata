const axios = require('axios');
const functions = {
getMasterClass: async (id,masterClassId) => {     

    const masterClass = await axios.get('http://localhost:3000/educationalOrganizations/masterClass/'+id+'/'+masterClassId)
    return masterClass
    },
    getAllMasterClass: async (id) => {
            const masterClass = await axios.get('http://localhost:3000/educationalOrganizations/masterClass/'+id+'/')
            return masterClass
            },
            
     createMasterClass : async (id,data) => {               
            const masterClass = await axios.post('http://localhost:3000/educationalOrganizations/masterClass/'+id,data)
            return masterClass
            },       
            
     deleteMasterClass : async (id,masterClassId) => {   
            const masterClass = await axios.delete('http://localhost:3000/educationalOrganizations/masterClass/'+id+'/'+masterClassId)
            return masterClass
            },       
     updateMasterClass : async (id,masterClassId,data) => {
            const masterClass = await axios.put('http://localhost:3000/educationalOrganizations/masterClass/'+id+'/'+masterClassId,data)
            return masterClass
             },

            };
            module.exports = functions;