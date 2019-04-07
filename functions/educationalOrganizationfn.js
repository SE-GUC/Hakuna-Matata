const axios = require('axios');
const functions = {
        createEducationalOrganization: async (id,data) => {
                const Edu = await axios.post('http://localhost:3000/educationalOrganizations/'+id,data)
                return Edu
                },
        
        deleteEducationalOrganization: async (id) => {
                const Edu = await axios.delete('http://localhost:3000/educationalOrganizations/'+id)
                return Edu
                },
        
        getEducationalOrganization: async (id) => {
                const Edu = await axios.get('http://localhost:3000/educationalOrganizations/'+id)
                return Edu
                },
       
        getAllEducationalOrganization: async () => {
                const allEdu = await axios.get('http://localhost:3000/educationalOrganizations/')
                return allEdu
                },
        updateEducationalOrganization: async (id,data) => {
               const Edu = await axios.put('http://localhost:3000/educationalOrganizations/'+id,data)
                return Edu
                },
                getSpecificCourse: async (id,courseId) => {
                        const specific_C_Edu = await axios.get('http://localhost:3000/educationalOrganizations/course/'+id+'/'+courseId)
                        return specific_C_Edu
                        },
                        
                      getAllCourses: async (id) => {
                        const specific_allC_Edu = await axios.get('http://localhost:3000/educationalOrganizations/course/'+id+'/')
                        return specific_allC_Edu
                        },
                      
                      createCourse: async (id,data1) => {
                      const Edu = await axios.post('http://localhost:3000/educationalOrganizations/course/'+id,data1)
                      return Edu
                       },
                      
                      
                     
                      
                      updateCourse:async(id,courseId,data)=>{
                        const Edu=await axios.put('http://localhost:3000/educationalOrganizations/course/'+id+'/'+courseId,data)
                        return Edu
                      },
                      deleteCourse:async(id,courseId)=>{
                        const Edu=await axios.delete('http://localhost:3000/educationalOrganizations/course/'+id+'/'+courseId)
                        return Edu
                      },
      
       


        

       
        
        
        
        
        
        

};
module.exports = functions;