class coworking_space{
    constructor(partner_id,id,name,location,phone_number,business_plans,facilites,rooms,max_no_rooms){
       this.partner_id=partner_id;
       this.id=id;
       this.name=name;
       this.phone_number=phone_number;
       this.location=location;
       this.business_plans=business_plans;
       this.facilites=facilites;
       this.rooms=rooms;
       this.max_no_rooms=max_no_rooms;
    }
}
module.exports=coworking_space