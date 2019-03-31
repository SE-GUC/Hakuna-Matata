const axios = require('axios');
const functions = {
    //create course req
    createCourseRequest : async(description1,categories1,applyingmember_id1)=>{
        const CourseRequest =await axios.post('http://localhost:3000/courserequests/newCourseRequest',{
           
                description:description1,
                categories: categories1,
                applyingmember_id:applyingmember_id1
        })
        
         return CourseRequest 
        },
        //get all course requests 
        getCourseRequests: async() => {
            const CourseRequests=await axios.get('http://localhost:3000/courserequests/')
            return CourseRequests
            },

    //get CR by id  
    getCourseRequestsbyID: async(id) => {
        const CourseRequests=await axios.get('http://localhost:3000/courserequests/'+id)
        return CourseRequests
        },
            //update course request by id 

//delete Course request by id 
deleteCourseRequest :async(id) => {
    const a='http://localhost:3000/courserequests/'+id+'/delete'
    const result =await axios.delete(a);
    return result 
    },


    //update Course request by id 
   
updateCourseRequest :async(id,description1,categories1,active1) => {
    const a='http://localhost:3000/courserequests/'+id+'/update'
    const result =await axios.put(a,{
        description:description1,
        categories:categories1,
        active:active1
    }
        );
    return result 
    },
}
module.exports = functions;