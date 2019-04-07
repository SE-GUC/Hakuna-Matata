const axios = require('axios');


const functions = {
	    getAllTasks: async () => {
                const co = await axios.get('http://localhost:3000/tasks/')
                return co
                },
                
        getSpecTask: async (id) => {
            // id => task_id
                const co = await axios.get('http://localhost:3000/tasks/'+id)
                return co
                },
                view_cycle: async (id) => {
                 // id => task_id
                const co = await axios.get('http://localhost:3000/tasks/viewCycle/'+id)
                return co
                },

         createTask : async (id,data) => {
             // id => partner_id
                const co = await axios.post('http://localhost:3000/tasks/'+id,data)
                return co
                },       
                
         deleteTask : async (id) => {
             // id => task_id
                const co = await axios.delete('http://localhost:3000/tasks/'+id)
                return co
                },       
        updateTask : async (id,data) => {
                const co = await axios.put('http://localhost:3000/tasks/'+id,data)
                return co
                },    
        update_state : async (id1,id2,data) => {
           // console.log (id1,id2,data)
                const co = await axios.put('http://localhost:3000/tasks/edit/'+id1+'/' + id2 ,data)
                //console.log(co.data.accepted)
                return co
                },    
        update_work_cycle : async (id1,data) => {
                const co = await axios.put('http://localhost:3000/tasks/updateWorkCycle/' + id1,data)
                return co
                }, 
                createMember:async(data)=>{
                    const member=await axios.post('http://localhost:3000/members/',data)
              return member
                  
              },
          deletemember: async(id)=>{
                          const a='http://localhost:3000/deleteMember/'+id
                          const member=await axios.delete(a)
                          return member
      },   
    applyForTask:async(id,task1)=>{
        
        const task=await axios.put('http://localhost:3000/members/applyForTask/'+id,task1)
        return task
    },  
    assignfortask:async(taskid,memberid)=>{
    const task=await axios.put('http://localhost:3000/tasks/assTask/'+taskid+'/'+memberid)
    return task
}   ,     
     rate: async (id,partnerId,data) => {
    const co = await axios.put('http://localhost:3000/tasks/giveRate/'+id+'/'+partnerId,data)
    return co
    },   
    getMembers: async() => {
        const members=await axios.get('http://localhost:3000/members/')
        return members
        },  
    get_applied_mem : async (id) => {
        const mem = await axios.get('http://localhost:3000/tasks/membersTask/' + id)
        return mem
    }
            
};

module.exports = functions;