const axios = require('axios');
const functions = {
    //get all Notifications 
    getNotifications: async () => {
        const notifications = await axios.get('http://localhost:3000/notifications/')
        return notifications
    },

    //get CR by id  
    getNotificationsbyID: async (id) => {
        const notification = await axios.get('http://localhost:3000/notifications/' + id)
        return notification
    },
    //get all Not-summary 
    getNotSummaries: async () => {
        const notSummaries = await axios.get('http://localhost:3000/notifications/get/NotSummary/')
        return notSummaries
    },

    //show adminn notifications to edit profile
    showAdminNot: async () => {
        const notifications = await axios.get('http://localhost:3000/notifications/get/admin')
        return notifications
    },

    //get notifications of specific member

    showMemberNot: async (id) => {
        const notifications = await axios.get('http://localhost:3000/notifications/member/' + id)
        return notifications
    },

    //admin aprove user 
    approveUser: async (userId1, approved1) => {
        const res = await axios.post('http://localhost:3000/notifications/approveUser', {
            userId: userId1,
            approved: approved1
        });
        return res
    },

    // delete notification and corresponding not summary by not id
    delNotandNotsum: async (id) => {
        const a = 'http://localhost:3000/notifications/' + id
        const result = await axios.delete(a);
        return result
    },

    //member request to edit profile 
    editProfileRequest: async (id) => {
        const a = 'http://localhost:3000/members/editRequest/'+id
        const result = await axios.post(a)
        return result
    },
  
}

module.exports = functions;