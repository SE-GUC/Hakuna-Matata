const axios = require('axios');
const functions = {
        
        get_all_course: async () => {
        const courses= await axios.get('http://localhost:3000/educational_organization/show_courses')
        return courses
        },
        get_course: async () => {
            const course= await axios.get('http://localhost:3000/educational_organization/5c9d664105f3401c3844e927/show_courses')
            return course
            },
        get_course_wrong: async () => {
                const course= await axios.get('http://localhost:3000/educational_organization/5c96176cb10301/show_courses')
                return course
                },
        delete_course: async () => {
                const Edu = await axios.delete('http://localhost:3000/educational_organization/delete_courses/5c9d666705f3401c3844e92a')
                return Edu
                },
    };
    module.exports = functions;