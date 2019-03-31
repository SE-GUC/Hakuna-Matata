const axios = require('axios');
const functions = {
    createmember:async(fullname1,skills1)=>{
          const member=await axios.post('http://localhost:3000/member/create',{
            fullname:fullname1,
            skills:skills1
    })
    return member
        
    },
    getMembers: async() => {
        const members=await axios.get('http://localhost:3000/member/')
        return members
        },
        updatemember:async(id,fullname1)=>{
            a='http://localhost:3000/member/'+id+'/update'
         const members=await axios.put(a,{
             fullname:fullname1
         })
         return members
        },
   
        
    createproject:async(tID,pID,LINK,id)=>{
        const a='http://localhost:3000/member/'+id+'/create_project'
        const project=await axios.post(a,{
           taskid:tID,
           partnerid:pID,
            link:LINK,
            //member_id:id
            
        })
       
         return project
        },
    getProjectbymemberid: async(id) => {
            const projects=await axios.get('http://localhost:3000/member/'+id+'/projects')
            return projects
            },
    deleteProjectbymemberid:async(id,pid)=>{
        const projects=await axios.delete('http://localhost:3000/member/'+id+'/project/'+pid)
        return projects
    },
    updateProjectbymemberid:async(id,pid,link1)=>{
        const projects=await axios.put('http://localhost:3000/member/'+id+'/project/'+pid,{
        link:link1
        })
        return projects
    },
    deletemember: async(id)=>{
                    const a='http://localhost:3000/deleteMember/'+id
                    const member=await axios.delete(a)
                    return member
                    },
    updateRating: async(id,newrate1)=>{
        const a='http://localhost:3000/member/'+id+'/ratemember'
        const member=await axios.put(a,{
           newrate:newrate1
        })
        return member
        }, 
    applyfortask:async(id,task1)=>{
        const a='http://localhost:3000/member/'+id+'/applyForTask'
        const task=await axios.put(a,{
            taskId:task1
        })
        return task
    },
    editingrequest:async(id)=>{
        const a='http://localhost:3000/member/'+id+'/editrequest'
        const member=await axios.post(a)
        return member
    }            

}
module.exports = functions;