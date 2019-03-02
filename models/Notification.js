// the Notification Model 


class Notification {
    constructor( notification_id, type, task_id,course_id,course_request_id, Sent_at) {
       this.notification_id=notification_id;
       this.type=type;
       this.task_id=task_id;
       this.course_id=course_id;;
       this.course_request_id=course_request_id;
       this.Sent_at=Sent_at;
    }
}

// The Not_summary model 
class Not_summary {
    constructor( not_parent_id , title ,expert_requires , sent_to) {
        this.not_parent_id=not_parent_id;
        this.title=title;
        this.expert_requires=expert_requires;
        this.sent_to=sent_to;



    }
}

module.exports.Not_summary = Not_summary;

module.exports.Notification = Notification;