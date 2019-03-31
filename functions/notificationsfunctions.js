const axios = require('axios');
const functions = {
     //get all Notifications 
     getNotifications: async() => {
        const Notifications=await axios.get('http://localhost:3000/Notification/')
        return Notifications
        },

         //get CR by id  
    getNotificationsbyID: async(id) => {
        const Notification=await axios.get('http://localhost:3000/Notification/'+id+'/Notification')
        return Notification
        },
    //get all Not-summary 
    getNotSummaries: async() => {
        const Not_summaries=await axios.get('http://localhost:3000/Notification/Not_summary')
        return Not_summaries
        },

   
      
     //show adminn notifications to edit profile
     showAdminNot: async(id) => {
        const notifications=await axios.get('http://localhost:3000/Notification/admin')
        return notifications
        }  
     ,
         
     //get notifications of specific member

     showmemberNot: async(id) => {
        const notifications=await axios.get('http://localhost:3000/Notification/'+id+'/Not_summary')
        return notifications
        },
       //admin aprove user 
       approveUser:   async(user_id1,approved1) => {
        const res=await axios.post('http://localhost:3000/Notification/approveUser',{
            user_id:user_id1,
            approved:approved1
        });
        return res
          },
         
      // delete notification and corresponding not summary by not id
      DelNotandNotsum :async(id) => {
         const a='http://localhost:3000/Notification/delete/'+id
         const result =await axios.delete(a);
         return result 
         },

}
    

module.exports = functions;