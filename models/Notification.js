const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/lirtenhub',{ useNewUrlParser: true})
.then(()=>console.log('Connected to mongodp'))
.catch(err => console.log("theres an error",err) );



//schemas
const NotificationSchema=new mongoose.Schema({
    notification_id: mongoose.Schema.Types.ObjectId,
	type: String,
	task_id: String,
	course_recommendation_id: String,
	course_request_id: String,
	sent_at:{ type: Date, default: Date.now}
});

const Not_summarySchema=new mongoose.Schema({
    not_parent_id: String,
		title: String,
		expert_requires: Boolean,
		sent_to: String
});


const Notification=mongoose.model('notifications',NotificationSchema)
const Not_summary=mongoose.model('not_summaries',Not_summarySchema)

module.exports.Notification= Notification
module.exports.Not_summary = Not_summary

//functions
//send course request notification 
async function Send_CourseRequest_Notification(course_request_id, title){
	
	const notification=new Notification({
		type:'courserequest',
		task_id: null,
		course_recommendation_id: null,
		course_request_id: course_request_id
		
	
	});
try{
	var lastSavedId;
	const result = await notification.save(function(err,room) {
	 });
	 console.log(notification._id)
	 //lastSavedId=notification._id

	 const notsummary=	new Not_summary({
		not_parent_id: notification._id,
		title: title,
		expert_requires: true,
		sent_to: null
	})

	 await notsummary.save();


}	
catch(err){
	console.log(err);
}
}



///send task notification
async function Send_Task_Notification(taskId,senttoID,title){
	
	const notification=new Notification({
		type:'task',
		task_id: null,
		course_recommendation_id: null,
		course_request_id: null
		
	
	});
try{
	var lastSavedId;
	const result = await notification.save(function(err,room) {
	 });
	 console.log(notification._id)
	 //lastSavedId=notification._id

	 const notsummary=	new Not_summary({
		not_parent_id: notification._id,
		title: title,
		expert_requires: false,
		sent_to: senttoID
	})

	 await notsummary.save();


}	
catch(err){
	console.log(err);
}
}


//functions
// request to admin to edit profile 
async function  SendToAdminRequestNotification(title){
	
	const notification=new Notification({
		type:'edit_profile',
		task_id: null,
		course_recommendation_id: null,
		course_request_id: null
		
	
	});
try{
	var lastSavedId;
	const result = await notification.save(function(err,room) {
	 });
	 console.log(notification._id)
	 //lastSavedId=notification._id

	 const notsummary=	new Not_summary({
		not_parent_id: notification._id,
		title: title,
		expert_requires: true,
		sent_to: "admin"
	})

	 await notsummary.save();


}	
catch(err){
	console.log(err);
}
}


//notification to user edit prof 
async function SendToUserRequestNotification(title,sentToID){
	
	const notification=new Notification({
		type:"edit_profile",
		task_id: null,
		course_recommendation_id: null,
		course_request_id: null
		
	
	});
try{
	var lastSavedId;
	const result = await notification.save(function(err,room) {
	 });
	 console.log(notification._id)
	 //lastSavedId=notification._id

	 const notsummary=	new Not_summary({
		not_parent_id: notification._id,
		title: title,
		expert_requires: true,
		sent_to: sentToID
	})

	 await notsummary.save();


}	
catch(err){
	console.log(err);
}
}
// course reco notifi
async function Send_CourseRecommendations_Notification(courseID, senttoID, title){
	
	const notification=new Notification({
		type:"recommendation",
		task_id: null,
		course_recommendation_id: courseID,
		course_request_id: null
		
	
	});
try{
	var lastSavedId;
	const result = await notification.save(function(err,room) {
	 });
	 console.log(notification._id)
	 //lastSavedId=notification._id

	 const notsummary=	new Not_summary({
		not_parent_id: notification._id,
		title: title,
		expert_requires: false,
		sent_to: senttoID
	})

	 await notsummary.save();


}	
catch(err){
	console.log(err);
}
}
  


//exports
module.exports.Send_CourseRecommendations_Notification = Send_CourseRecommendations_Notification;
module.exports.SendToAdminRequestNotification = SendToAdminRequestNotification;
module.exports.SendToUserRequestNotification = SendToUserRequestNotification;
module.exports.Send_CourseRequest_Notification=Send_CourseRequest_Notification;
module.exports.Send_Task_Notification=Send_Task_Notification;


//

