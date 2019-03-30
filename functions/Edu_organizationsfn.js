const axios = require('axios');
const functions = {
        create_Edu: async (id,data) => {
                const Edu = await axios.post('http://localhost:3000/educational_organization/create_educational_organization/'+id,data)
                return Edu
                },
        
        delete_Edu: async (id) => {
                const Edu = await axios.delete('http://localhost:3000/educational_organization/'+id+'/delete_educational_organization')
                return Edu
                },
        
        get_Edu: async (id) => {
                const Edu = await axios.get('http://localhost:3000/educational_organization/'+id+'/show_educational_organization')
                return Edu
                },
        get_Edu_wrong: async (id) => {
                        const Edu = await axios.get('http://localhost:3000/educational_organization/'+id+'/show_educational_organization')
                        return Edu
                        },
        get_allEdu: async () => {
                const allEdu = await axios.get('http://localhost:3000/educational_organization/')
                return allEdu
                },
        update_Edu: async (id,data) => {
               const Edu = await axios.put('http://localhost:3000/educational_organization/'+id+'/update_educational',data)
                return Edu
                },
      
        get_specific_C_Edu: async (id,id1) => {
                const specific_C_Edu = await axios.get('http://localhost:3000/educational_organization/'+id+'/sho/'+id1)
                return specific_C_Edu
                },
        
        get_all_C_Edu: async (id) => {
                const specific_allC_Edu = await axios.get('http://localhost:3000/educational_organization/'+id+'/show_educational_organization/Show_cousrses')
                return specific_allC_Edu
                },
       
       create_course_Edu: async (id,data1) => {
              const Edu = await axios.post('http://localhost:3000/educational_organization/'+id+'/add_course',data1)
              return Edu
               },
       

        create_course: async (data1) => {
                const Edu = await axios.post('http://localhost:3000/educational_organization/add_course',data1)
                return Edu
                },

        update_course_edu:async(id,id1,data)=>{
                const Edu=await axios.put('http://localhost:3000/educational_organization/'+id+'/update_course/'+id1,data)
                return Edu
        },
       delete_course_edu:async(id,id1)=>{
                const Edu=await axios.delete('http://localhost:3000/educational_organization/'+id+'/delete_courses/'+id1)
                return Edu
        },
        show_courses:async()=>{
                const Edu=await axios.get('http://localhost:3000/educational_organization/show_courses')
                return Edu
        },
        delete_courses:async(id)=>{
                const Edu=await axios.delete('http://localhost:3000/educational_organization/delete_courses/'+id)
                return Edu
        },
        get_courses:async(id)=>{
                const Edu=await axios.get('http://localhost:3000/educational_organization/'+id+'/show_courses')
                return Edu
        },
        update_courses:async(id,data)=>{
                const Edu=await axios.put('http://localhost:3000/educational_organization/update_course/'+id,data)
                return Edu
        }



        

       
        
        
        
        
        
        

};
module.exports = functions;