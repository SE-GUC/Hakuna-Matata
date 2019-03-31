const axios = require('axios');

const functions = {
	getAll: async () => {
        const co = await axios.get('http://localhost:3000/coworking_space/')
        return co
        },
        getSpec: async (id) => {
                const co = await axios.get('http://localhost:3000/coworking_space/'+id)
                return co
                },

         createOne : async (id,data) => {
                const co = await axios.post('http://localhost:3000/coworking_space/create/'+id,data)
                return co
                },       
                
         deleteOne : async (id) => {
                const co = await axios.delete('http://localhost:3000/coworking_space/'+id+'/delete')
                return co
                },       
                updateOne : async (id,data) => {
                       const co = await axios.put('http://localhost:3000/coworking_space/'+id+'/update',data)
                       return co
                       },       
};
module.exports = functions;