const axios = require('axios');
const functions = {
    createMember:async(fullName1,skills1)=>{
          const member=await axios.post('http://localhost:3000/members/',{
            fullName:fullName1,
            skills:skills1
    })
    return member
        
    },
    getMembers: async() => {
        const members=await axios.get('http://localhost:3000/members/')
        return members
        },
        updateMember:async(id,fullName1)=>{
            a='http://localhost:3000/members/'+id
         const members=await axios.put(a,{
             fullName:fullName1
         })
         return members
        },
   
        
    createProject:async(tID,pID,LINK,id)=>{
        const a='http://localhost:3000/members/project/'+ id
        const project=await axios.post(a,{
           taskId:tID,
           partnerId:pID,
            link:LINK,
            //memberId:id  
        })

         return project
        },
    getProjectByMemberId: async(id) => {
            const projects=await axios.get('http://localhost:3000/members/project/'+ id)
            return projects
            },
    deleteProjectByMemberId:async(id,pid)=>{
        const projects=await axios.delete('http://localhost:3000/members/project/'+ id +'/'+ pid)
        return projects
    },
    updateProjectByMemberId:async(id,pid,link1)=>{
        const projects=await axios.put('http://localhost:3000/members/project/'+ id+'/'+ pid,{
        link:link1
        })
        return projects
    },
    deleteMember: async(id)=>{
                    const a='http://localhost:3000/members/'+id
                    const member=await axios.delete(a)
                    return member
                    },
    updateRating: async(id,newRate1)=>{
        const a='http://localhost:3000/members/rate/'+id
        const member=await axios.put(a,{
           newRate:newRate1
        })
        return member
        }, 
    applyForTask:async(id,task1)=>{
        const a='http://localhost:3000/members/applyForTask/'+id
        const task=await axios.put(a,{
            taskId:task1
        })
        return task
    },
    editingRequest:async(id)=>{
        const a='http://localhost:3000/members/editRequest/'+id
        const member=await axios.post(a)
        return member
    }            

}
module.exports = functions;