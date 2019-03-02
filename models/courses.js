class courses{
    //adding attribute , educational_organziation id needed??
    //master class id needed??
    //students_assigened will be array of members
    //effort is the required time students have to spend during the course
    constructor(id,name,educator_id,educator_name,description,places,available_places,payment,students_assigened,course_duration,start_date,end_date,categories,availble,listofapplies){
        this.id=id;
        this.name=name;
        this.educator_id=educator_id;
        this.educator_name=educator_name;
        this.places=places;
        this.available_places=available_places;
        this.payment=payment;
        this.description=description;
        this.students_assigened=students_assigened;
        this.course_duration=course_duration;
        this.start_date=start_date;
        this.end_date=end_date;
        this.categories=categories;
        this.availble=availble;
        this.listofapplies=listofapplies;
    
    }
}
module.exports=courses