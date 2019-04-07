const axios = require('axios');
const functions = {
        
        getAllCourses: async () => {
        const courses= await axios.get('http://localhost:3000/courses/')
        return courses
        },
        getCourse: async (id) => {
            const course= await axios.get('http://localhost:3000/courses/'+id)
            return course
            },
        
        deleteCourse: async (id) => {
                const course = await axios.delete('http://localhost:3000/courses/'+id)
                return course
                },
        createCourse: async (data) => {
                        const course = await axios.post('http://localhost:3000/courses/',data)
                        return course
                        },
        updateCourse: async (id,data) => {
                        const course = await axios.put('http://localhost:3000/courses/'+id,data)
                        return course
                        },
    };
    module.exports = functions;