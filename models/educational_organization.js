
class educational_organization{
    //educational_oragnization can offer courses or series of courses 
    //master class is series of courses 
    constructor (id,partner_id,name,certificates,training_programs,courses,master_class,educators){
        
        this.partner_id=partner_id;
        this.id=id;
        this.name=name;
        this.certificates=certificates;
        this.training_programs=training_programs;
        this.courses=courses;
        this.master_class=master_class;
        this.educators=educators;   
    }
}





module.exports=educational_organization