// The Member model 
class Member {
    constructor(id,fullname,webname,datejoined,deactivated,completed_task_id,appliedtask,levelofexpreience,Rating,
        numberofrecomendationsgiven,averagerecomendationrating ,allratedtasks,skills) {
        this.id=id;
        this.fullname=fullname;
        this.webname=webname;
        this.datejoined=datejoined;
        this.deactivated=deactivated;
        this.completed_task_id=completed_task_id;
        this.appliedtask=appliedtask;
        this.levelofexpreience=levelofexpreience;
        this.Rating=Rating;
        this.all_rated_reco=numberofrecomendationsgiven;
        this.avreage_reco_rate=averagerecomendationrating;
        this.allratedtasks=allratedtasks;
        this.skills=skills
    };
}

module.exports = Member

