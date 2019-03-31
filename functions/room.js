const axios = require('axios');

const functions = {
	getAll: async (id) => {
        const co = await axios.get('http://localhost:3000/coworking_space/'+id+'/show_rooms')
        return co
        },
        getSpec: async (id,room_id) => {
                const co = await axios.get('http://localhost:3000/coworking_space/'+id+'/show_room/'+room_id)
                return co
                },

         createOne : async (id,data) => {
                const co = await axios.post('http://localhost:3000/coworking_space/add_room/'+id,data)
                return co
                },       
                
         deleteOne : async (id,room_id) => {
                const co = await axios.delete('http://localhost:3000/coworking_space/'+id+'/delete_room/'+room_id)
                return co
                },       
                updateOne : async (id,data,room_id) => {
                       const co = await axios.put('http://localhost:3000/coworking_space/'+id+'/update_room/'+room_id,data)
                       return co
                       },
                       getAll2: async () => {
                        const co = await axios.get('http://localhost:3000/coworking_space/show_rooms/collection')
                        return co
                        },
                        getSpec2: async (id) => {
                                const co = await axios.get('http://localhost:3000/coworking_space/show_room/'+id)
                                return co
                                },
                
                         createOne2 : async (data) => {
                                const co = await axios.post('http://localhost:3000/coworking_space/add_room',data)
                                return co
                                },       
                                
                         deleteOne2 : async (id) => {
                                const co = await axios.delete('http://localhost:3000/coworking_space/delete_room/'+id)
                                return co
                                },       
                                updateOne2 : async (id,data) => {
                                       const co = await axios.put('http://localhost:3000/coworking_space/update_room/'+id,data)
                                       return co
                                       },
                                              
                                reserve : async (id,room_id,data) => {
                                       const co = await axios.put('http://localhost:3000/coworking_space/accept_reservation/'+id+'/'+room_id,data)
                                       return co
                                       },
                                              
};
module.exports = functions;