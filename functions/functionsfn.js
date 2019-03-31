const axios = require('axios');
const functions = {
        add: (x,y) => x+y,
       /////////////////////////////
       ////fuc_certificants
       getAllcertificant: async (id) =>{
        const cer = await axios.get('http://localhost:3000/educational_organization/'+id+'/show_certificates');
        return cer;
        },

        getspecificcertificant:async (id1,id2) =>{
                const cer = await axios.get('http://localhost:3000/educational_organization/'+id1+'/show_certificates/'+id2)
                return cer;
        },
       
        create_certificant:async (id,data) =>{
                const cer =await axios.post('http://localhost:3000/educational_organization/'+id+'/create_certificates',data)
                return cer;
        
                }, 
         delete_certificanst: async (id1,id2) =>{
                const cer = await axios.delete('http://localhost:3000/educational_organization/'+id1+'/delete_certificate/'+id2)
                return cer
                        
                 },       
                

        updatecertificate : async (id1,id2,data) => {
                const cer = await axios.put('http://localhost:3000/educational_organization/'+id1+'/update_certificate/'+id2,data)
                return cer
                },       
//////////////////////////////////////////////////////   

        create_Edu: async (id,data) => {
                 const Edu = await axios.post('http://localhost:3000/educational_organization/create_educational_organization/'+id,data)
                  return Edu
                  },      
                  
        delete_Edu: async (id) => {
                 const Edu = await axios.delete('http://localhost:3000/educational_organization/'+id+'/delete_educational_organization')
                 return Edu
                }, 
         get_allEdu: async () => {
                const allEdu = await axios.get('http://localhost:3000/educational_organization/')
                 return allEdu
                 },           
            
//////////////////////////////////////////////////////
///////funcs_training_programs

        getAllprograms: async (id) =>{
                const cer = await axios.get('http://localhost:3000/educational_organization/'+id+'/show_training_programs');
                return cer;
                },
           
                
         getspecificprograms:async (id1,id2) =>{
                const cer = await axios.get('http://localhost:3000/educational_organization/'+id1+'/show_training_programs/'+id2)
                 return cer;
                 },
             
                 
         create_programs:async (id,data) =>{
                const cer =await axios.post('http://localhost:3000/educational_organization/'+id+'/add_programs',data)
                return cer;
                        
                 }, 

         delete_programs: async (id1,id2) =>{
                 const cer = await axios.delete('http://localhost:3000/educational_organization/'+id1+'/delete_training_programs/'+id2)
                return cer
                                 
                 },       
                                
                
        updateprograms : async (id1,id2,data) => {
                 const cer = await axios.put('http://localhost:3000/educational_organization/'+id1+'/update_programs/'+id2,data)
                return cer
              
        },       
                        
         



/*

       add_certificant:async (type1,name1,accreditation1) =>{
        const cer2 =await axios.post('http://localhost:3000/educational_organization/5c9e297409727525ccecbf49/create_certificates',{

        type:type1,
        name:name1,
        accreditation:accreditation1

        })
                return cer2

        }, 

       getcertificant: async () =>{
                const cer = await axios.get('http://localhost:3000/educational_organization/5c9e297409727525ccecbf49/show_certificates');
                return cer;
        },

        getspecificcertificant:async () =>{
                const cer1 = await axios.get('http://localhost:3000/educational_organization/5c9e297409727525ccecbf49/show_certificates/5c9e327896d52c3a0cbdd84d')
                return cer1;
        },

      

        delete_certificanst: async () =>{
        const cer3 = await axios.delete('http://localhost:3000/educational_organization/5c9e297409727525ccecbf49/delete_certificate/5c9e327896d52c3a0cbdd84d')
        return cer3
        
        },*/
        
     
};
module.exports = functions;