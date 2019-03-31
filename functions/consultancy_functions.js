const axios = require('axios');

const functions={
    getagencies: async () => {
        const agency = await axios.get('http://localhost:3000/consultancy_agency/show')
        return agency
        },
    getagency: async (id) => {
        const agency = await axios.get("http://localhost:3000/consultancy_agency/show/"+id)
        return agency
        },
        add_agency: async (partnerid,data) => {
            const agency = await axios.post("http://localhost:3000/consultancy_agency/add_agency/"+partnerid,data)
            return agency
            },
        delete_agency: async (agencyid) => {
             const agency = await axios.delete("http://localhost:3000/consultancy_agency/delete_agency/"+agencyid)
            return agency
             },
             
        update_agency: async (agencyid,data) => {
            const agency = await axios.put("http://localhost:3000/consultancy_agency/update_agency/"+agencyid,data)
            return agency
            },
            add_report:async (agencyid,report1) => {
                const agency = await axios.put("http://localhost:3000/consultancy_agency/add_report/"+agencyid,{
                    report:report1
                })
                return agency
                },
        add_task: async (partnerid,data) =>{
            const agency = await axios.post("http://localhost:3000/task/create/"+partnerid,data)
            return agency
        },
        get_task: async (task_id) =>{
            const agency = await axios.get("http://localhost:3000/task/"+task_id+"/admin")
            return agency
        },
        delete_task: async (task_id) =>{
            const agency = await axios.delete("http://localhost:3000/task/"+task_id+"/deletetask")
            return agency
        },
        feedback:async(agencyid,taskid,data) =>{
            const agency=await axios.post("http://localhost:3000/consultancy_agency/feedback/"+agencyid+"/"+taskid,data)
            return agency
        },
        show_unconsultedtasks:async() =>{
            const agency=await axios.get("http://localhost:3000/consultancy_agency/show_unconsultedtasks")
            return agency
        },
        show_consulted_tasks:async(partner_id,task_id) =>{
            const agency=await axios.get("http://localhost:3000/consultancy_agency/show_consulted_tasks/"+partner_id+"/"+task_id)
            return agency
        },
        show_consulted_task:async(partner_id,task_id,consultancy_agency_id) =>{
            const agency=await axios.get("http://localhost:3000/consultancy_agency/show_consulted_task/"+partner_id+"/"+task_id+"/"+consultancy_agency_id)
            return agency
        },
        accept_consulted_task:async(partner_id,task_id,consultancy_agency_id) =>{
            const agency=await axios.put("http://localhost:3000/consultancy_agency/"+consultancy_agency_id+"/accept_consulted_tasks/"+partner_id+"/"+task_id)
            return agency
        },
        update_consultance:async(consultancy_agency_id,task_id,data) =>{
            const agency = await axios.put("http://localhost:3000/consultancy_agency/"+consultancy_agency_id+"/update_consultance/"+task_id,data)
            return agency
        },
        delete_consultance:async(consultancy_agency_id,task_id) =>{
            const agency = await axios.delete("http://localhost:3000/consultancy_agency/"+consultancy_agency_id+"/delete_consultance/"+task_id)
            return agency
        },
}

module.exports = functions;