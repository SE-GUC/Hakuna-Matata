const axios = require('axios');
const functions = {
        createpartner:async(name1,information1,partners1,field_of_work1,projects1,feedback_form1)=>{
            const partner=await axios.post('http://localhost:3000/partner/create',{
                        name:name1,
                        information: information1,
                        partners: partners1,
                        field_of_work:field_of_work1,
                        projects: projects1,
                        feedback_form:feedback_form1
                })
               
                 return partner
        },
        //get all partners
        getPartners: async() => {
                const partners=await axios.get('http://localhost:3000/partner/')
                return partners
                },
        //get partner by id
         getPartnerbyID: async(id) => {
        const a='http://localhost:3000/partner/'+id
                        const partner=await axios.get(a)
                        return partner
                        },
        //delete partner by id
        deletepartner: async(id)=>{
        const a='http://localhost:3000/partner/'+id+'/deletepartner'
        const partner=await axios.delete(a)
        return partner
        },
        

        getprojectofpartnerbyID: async(id) => {
        const a='http://localhost:3000/partner/'+id+'/projects'
        const project=await axios.get(a)
        return project
                        },
        updatepartner: async(id,data)=>{
                const a='http://localhost:3000/partner/'+id+'/update'
                const partner=await axios.put(a,data)
        return partner
        },
        editingrequest:async(id)=>{
                const a='http://localhost:3000/partner/'+id+'/editrequest'
                const member=await axios.post(a)
                return member
            },
        
      

       
       
};
module.exports = functions;