const axios = require('axios');
const functions = {
        createPartner:async(name1,information1,partners1,fieldOfWork1,projects1,feedbackForm1)=>{
            const partner=await axios.post('http://localhost:3000/partners/',{
                        name:name1,
                        information: information1,
                        partners: partners1,
                        fieldOfWork:fieldOfWork1,
                        projects: projects1,
                        feedbackForm:feedbackForm1
                })
               
                 return partner
        },
        //get all partners
        getPartners: async() => {
                const partners=await axios.get('http://localhost:3000/partners/')
                return partners
                },
        //get partner by id
         getPartnerByID: async(id) => {
        const a='http://localhost:3000/partners/'+id
                        const partner=await axios.get(a)
                        return partner
                        },
        //delete partner by id
        deletePartner: async(id)=>{
        const a='http://localhost:3000/partners/'+id
        const partner=await axios.delete(a)
        return partner
        },
        

        getProjectOfPartnerByID: async(id) => {
        const a='http://localhost:3000/partners/project/'+id
        const project=await axios.get(a)
        return project
                        },
        updatePartner: async(id,data)=>{
                const a='http://localhost:3000/partners/'+id
                const partner=await axios.put(a,data)
        return partner
        },
        editingRequest:async(id)=>{
                const a='http://localhost:3000/partners/editRequest/'+id
                const partner=await axios.post(a)
                return partner
            },
        
      

       
       
};
module.exports = functions;