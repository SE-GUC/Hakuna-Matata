const mongoose = require('mongoose')

// schemas
const NotificationSchema = new mongoose.Schema({

	notificationId: {
		type: mongoose.Schema.Types.ObjectId
	},
	type: {
		type: String
	},
	taskId: {
		type: String
	},
	courseRecommendationId: {
		type: String
	},
	courseRequestId: {
		type: String
	},
	sentAt: {
		type: Date,
		default: Date.now
	}
})

const NotSummarySchema = new mongoose.Schema({

	notParentId: {
		type: String
	},
	title: {
		type: String
	},
	expertRequires: {
		type: Boolean
	},
	sentTo: {
		type: String
	}
})

const Notification = mongoose.model('notifications', NotificationSchema)
const NotSummary = mongoose.model('notSummaries', NotSummarySchema)

module.exports.Notification = Notification
module.exports.NotSummary = NotSummary

// functions
// send course request notification 
async function sendCourseRequestNotification(courseRequestId, title) {
	const notification = new Notification({

		type: 'courserequest',
		taskId: null,
		courseRecommendationId: null,
		courseRequestId: courseRequestId
	})
	try {
		var lastSavedId
		const result = await notification.save(function (err, room) {
			if (err) throw err
		})
		console.log(notification._id)
		const notSummary = new NotSummary({

			notParentId: notification._id,
			title: title,
			expertRequires: true,
			sentTo: null
		})
		await notSummary.save()
	}
	catch (err) {
		console.log(err)
	}
}

// send task notification
async function sendTaskNotification(taskId, senttoID, title) {
	const notification = new Notification({

		type: 'task',
		taskId: taskId,
		courseRecommendationId: null,
		courseRequestId: null
	})
	try {
		var lastSavedId
		const result = await notification.save(function (err, room) {
			if (err) throw err
		})

		const notsummary = new NotSummary({
			notParentId: notification._id,
			title: title,
			expertRequires: false,
			sentTo: senttoID
		})
		await notsummary.save()
	}
	catch (err) {
		console.log(err)
	}
}


// functions
// request to admin to edit profile 
async function sendToAdminRequestNotification(title) {

	const notification = new Notification({
		type: 'edit_profile',
		taskId: null,
		courseRecommendationId: null,
		courseRequestId: null
	})
	try {
		var lastSavedId
		const result = await notification.save(function (err, room) {
			if (err) throw err
		})

		const notsummary = new NotSummary({
			notParentId: notification._id,
			title: title,
			expertRequires: true,
			sentTo: 'admin'
		})

		await notsummary.save()

	}
	catch (err) {
		console.log(err)
	}
}

//notification to user edit prof 
async function sendToUserRequestNotification(title, sentToID) {

	const notification = new Notification({
		type: "edit profile",
		taskId: null,
		courseRecommendationId: null,
		courseRequestId: null


	})
	try {
		var lastSavedId
		const result = await notification.save(function (err, room) {
			if (err) throw err
		})

		const notsummary = new NotSummary({
			notParentId: notification._id,
			title: title,
			expertRequires: true,
			sentTo: sentToID
		})
		await notsummary.save()
	}
	catch (err) {
		console.log(err)
	}
}
// course reco notifi
async function sendCourseRecommendationsNotification(courseID, senttoID, title) {

	const notification = new Notification({
		type: "recommendation",
		taskId: null,
		courseRecommendationId: courseID,
		courseRequestId: null

	})
	try {
		var lastSavedId
		const result = await notification.save(function (err, room) {
			if (err) throw err
		})

		const notsummary = new NotSummary({
			notParentId: notification._id,
			title: title,
			expertRequires: false,
			sentTo: senttoID
		})

		await notsummary.save()

	}
	catch (err) {
		console.log(err)
	}
}

// exports
module.exports.sendCourseRecommendationsNotification = sendCourseRecommendationsNotification
module.exports.sendToAdminRequestNotification = sendToAdminRequestNotification
module.exports.sendToUserRequestNotification = sendToUserRequestNotification
module.exports.sendCourseRequestNotification = sendCourseRequestNotification
module.exports.sendTaskNotification = sendTaskNotification


