const axios = require('axios');


const functions = {
	    getAllTasks: async () => {
                const co = await axios.get('http://localhost:3000/task/')
                return co
                },
                
        getSpecTask: async (id) => {
            // id => task_id
                const co = await axios.get('http://localhost:3000/task/'+id+'/admin')
                return co
                },
                view_cycle: async (id) => {
                 // id => task_id
                const co = await axios.get('http://localhost:3000/task/'+id+'/viewCycle')
                return co
                },

         createTask : async (id,data) => {
             // id => partner_id
                const co = await axios.post('http://localhost:3000/task/create/'+id,data)
                return co
                },       
                
         deleteTask : async (id) => {
             // id => task_id
                const co = await axios.delete('http://localhost:3000/task/'+id+'/deletetask')
                return co
                },       
        updateTask : async (id,data) => {
                const co = await axios.put('http://localhost:3000/task/'+id+'/update_task',data)
                return co
                },    
        update_state : async (id1,id2,data) => {
           // console.log (id1,id2,data)
                const co = await axios.put('http://localhost:3000/task/'+id1+'/edit/' + id2 ,data)
                //console.log(co.data.accepted)
                return co
                },    
        update_work_cycle : async (id1,data) => {
                const co = await axios.put('http://localhost:3000/task/'+id1+'/updateworkcycle',data)
                return co
                }, 
                createmember:async(fullname1,skills1)=>{
                    const member=await axios.post('http://localhost:3000/member/create',{
                      fullname:fullname1,
                      skills:skills1
              })
              return member
                  
          },
          deletemember: async(id)=>{
                          const a='http://localhost:3000/deleteMember/'+id
                          const member=await axios.delete(a)
                          return member
      },   
        applyfortask:async(id,task1)=>{
            console.log(task1.taskId)
        const a='http://localhost:3000/member/'+id+'/applyForTask'
        const task=await axios.put(a,{
            task_Id:task1.taskId
        })
        return task
},      
assignfortask:async(memberid,taskid)=>{
    console.log(memberid,taskid)
    const a='http://localhost:3000/task/'+taskid+'/assTask/'+memberid
    const task=await axios.put(a)
    return task
},     
rate: async () => {
    const co = await axios.get('http://localhost:3000/task/'+id+'give_rate' +id)
    return co
    },     
            
};
module.exports = functions;