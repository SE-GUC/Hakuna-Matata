
class master_class{
    constructor(id,name,description,payment,places,available_places,courses,course_duration,start_date,end_date,level_of_students,effort,available){
        this.id=id;
        this.name=name;
        this.description=description;
        this.payment=payment;
        this.places=places;
        this.available_places=available_places;
        this.courses=courses;
        this.course_duration=course_duration;
        this.start_date=start_date;
        this.end_date=end_date;
        this.level_of_students=level_of_students;
        this.effort=effort;
        this.available=available
    }
}
module.exports=master_class