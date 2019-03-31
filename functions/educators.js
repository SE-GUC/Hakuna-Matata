const axios = require('axios');

const functions = {
       getSpec: async (id,educator_id) => {
        const co = await axios.get('http://localhost:3000/educational_organization/'+id+'/show_educc/'+educator_id)
    return co
       },
    getAll: async (id) => {
                const co = await axios.get('http://localhost:3000/educational_organization/'+id+'/show_educator_profile/')
                return co
                },

         createOne : async (id,data) => {
                const co = await axios.post('http://localhost:3000/educational_organization/'+id+'/add_educators_info',data)
                return co
                },       
                
         deleteOne : async (id,educator_id) => {
                const co = await axios.delete('http://localhost:3000/educational_organization/'+id+'/delete_educator_profile/'+educator_id)
                return co
                },       



                updateOne : async (id,data,educator_id) => {
                       const co = await axios.put('http://localhost:3000/educational_organization/update_educator/'+id+'/'+educator_id,data)
                       return co
                       },

                       getSpec2: async (id,master_class_id) => {    
                        const co = await axios.get('http://localhost:3000/educational_organization/'+id+'/show_educational_organization/'+master_class_id+'/Show_MasterClasses')
                        return co
                        },
                        getAll2: async (id) => {
                                const co = await axios.get('http://localhost:3000/educational_organization/'+id+'/show_master_classes')
                                return co
                                },
                                
                         createOne2 : async (id,data) => {               
                                const co = await axios.post('http://localhost:3000/educational_organization/' +id+'/add_master_classes/',data)
                                return co
                                },       
                                
                         deleteOne2 : async (id,master_class_id) => {   
                                const co = await axios.delete('http://localhost:3000/educational_organization/' +id+'/delete_master_class/'+master_class_id)
                                return co
                                },       
                                updateOne2 : async (id,master_class_id,data) => {
                                       const co = await axios.put('http://localhost:3000/educational_organization/' +id+'/update_master/'+master_class_id,data)
                                       return co
                                       },
                              
                                              
};
module.exports = functions;