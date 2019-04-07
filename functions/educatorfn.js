const axios = require('axios');

const functions = {
       getSpecificEducator: async (id,educatorId) => {
        const co = await axios.get('http://localhost:3000/educationalOrganizations/educator/'+id+'/'+educatorId)
    return co
       },
         getAllEducators: async (id) => {
                const co = await axios.get('http://localhost:3000/educationalOrganizations/educator/'+id+'/')
                return co
                },

         createEducator : async (id,data) => {
                const co = await axios.post('http://localhost:3000/educationalOrganizations/educator/'+id,data)
                return co
                },       
                
         deleteEducator : async (id,educatorId) => {
                const co = await axios.delete('http://localhost:3000/educationalOrganizations/educator/'+id+'/'+educatorId)
                return co
                },       



         updateEducator : async (id,data,educatorId) => {
                       const co = await axios.put('http://localhost:3000/educationalOrganizations/educator/'+id+'/'+educatorId,data)
                       return co
                       },

                   
                              
                                              
};
module.exports = functions;