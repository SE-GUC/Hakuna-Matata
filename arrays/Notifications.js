/*var moment = require("moment");
const { Notification, Not_summary } = require("../models/Notification.js");

//notifications arrays
var notifications = [
  new Notification(
    1,
    "task",
    1,
    null,
    null,
    moment().format("MMMM Do YYYY, h:mm:ss a")
  ),
  new Notification(
    2,
    "request",
    null,
    null,
    1,
    moment().format("MMMM Do YYYY, h:mm:ss a")
  )
];

var notificationSummaries = [
  new Not_summary(1, "youve been assigned!", false, 1),
  new Not_summary(2, "Help plsss helppp omggg!", true, null)
];

// any notification regarding tasks

function Send_Task_Notification(taskId, senttoID, title) {
  var nNewID = notifications.length + 1;
  notifications.push(
    new Notification(
      nNewID,
      "task",
      taskId,
      null,
      null,
      moment().format("MMMM Do YYYY, h:mm:ss a")
    )
  );
  notificationSummaries.push(new Not_summary(nNewID, title, false, senttoID));
}


// sending notification for course request
function Send_CourseRequest_Notification(course_request_id, title) {
  var nNewID = notifications.length + 1;
  notifications.push(
    new Notification(
      nNewID,
      "request",
      null,
      null,
      course_request_id,
      moment().format("MMMM Do YYYY, h:mm:ss a")
    )
  );
  notificationSummaries.push(new Not_summary(nNewID, title, true, null));
}


// sending notification for course recommendation
function Send_CourseRecommendations_Notification(courseID, senttoID, title) {
  var nNewID = notifications.length + 1;
  notifications.push(
    new Notification(
      nNewID,
      "recommendation",
      null,
      courseID,
      null,
      moment().format("MMMM Do YYYY, h:mm:ss a")
    )
  );
  notificationSummaries.push(new Not_summary(nNewID, title, false, senttoID));
}

// sending notification for requesting to edit profile
function SendToAdminRequestNotification(title) {
  var nNewID = notifications.length + 1;
  notifications.push(
    new Notification(
      nNewID,
      "edit_profile",
      null,
      null,
      null,
      moment().format("MMMM Do YYYY, h:mm:ss a")
    )
  );
  notificationSummaries.push(new Not_summary(nNewID, title, false, "admin"));
}



function SendToUserRequestNotification(title,sentToID) {
    var nNewID = notifications.length + 1;
    notifications.push(
      new Notification(
        nNewID,
        "edit_profile",
        null,
        null,
        null,
        moment().format("MMMM Do YYYY, h:mm:ss a")
      )
    );
    notificationSummaries.push(new Not_summary(nNewID, title, false, sentToID));
  }






//exports

module.exports.Send_CourseRecommendations_Notification = Send_CourseRecommendations_Notification;
module.exports.SendToAdminRequestNotification = SendToAdminRequestNotification;
module.exports.SendToUserRequestNotification = SendToUserRequestNotification;

module.exports.Send_Task_Notification = Send_Task_Notification;
module.exports.Send_CourseRequest_Notification = Send_CourseRequest_Notification;
module.exports.notifications = notifications;
module.exports.notificationSummaries = notificationSummaries;
*/