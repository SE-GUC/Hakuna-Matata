const mongoose = require('mongoose')
        const Schema = mongoose.Schema
        const ConsultanceTask = new Schema({
            partner_id: {
                type: String,
                required: false
            },
            consultancy_agency_id: {
                type: String,
                required: false
            },
            member_id: {
                type: String,
                required: false
            },
            admin_id: {
                type: String, 
                required: false
            },
            applied_id: {
                type: [String]
            },
            description: {
                type: String
            },
            required_skills: {
                type: [String]
            },
            monetary_compensation: {
                type: String
            },
            deadline: {
                type: Date
            },
            deadline_for_apply: {
                type: Date
            },
            upload_date: {
                type: Date
            },
            submission_date: {
                type: Date
            },
            experience_level: {
                type: Number
            },
            commit_level: {
                type: Number
            },
            work_cycle: {
                type: String
            },
            link_of_task: {
                type: String
            },
            user_rate: {
                type: Number
            },
            accepted: {
                type: Boolean
            },
            rate: {
                type: Number
            },
            consulty_needed: {
                type: Boolean
            },
            cunsulties_done: {
                type: Array
            }
        })
        
        module.exports = task = mongoose.model('task', ConsultanceTask)