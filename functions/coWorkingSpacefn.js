const axios = require('axios');

const functions = {
	getAll: async () => {
        const co = await axios.get('http://localhost:3000/coWorkingSpaces/')
        return co
        },
        getSpec: async (id) => {
                const co = await axios.get('http://localhost:3000/coWorkingSpaces/'+id)
                return co
                },

         createOne : async (id,data) => {
                const co = await axios.post('http://localhost:3000/coWorkingSpaces/'+id,data)
                return co
                },       
                
         deleteOne : async (id) => {
                const co = await axios.delete('http://localhost:3000/coWorkingSpaces/'+id)
                return co
                },       
                updateOne : async (id,data) => {
                       const co = await axios.put('http://localhost:3000/coWorkingSpaces/'+id,data)
                       return co
                       },       
};
module.exports = functions;