class training_programs{
    constructor(id,name,trainer_id,trainer_name,description,type,duration,apply_due_date,start_date,required_skills){
        this.id=id;
        this.name=name;
        this.trainer_id=trainer_id;
        this.trainer_name=trainer_name;
        this.description=description;
        this.type=type;
        this.duration=duration;
        this.apply_due_date=apply_due_date;
        this.start_date=start_date;
        this.required_skills=required_skills;



    }
}

module.exports=training_programs