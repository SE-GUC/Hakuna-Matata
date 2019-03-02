class room{
    constructor(reserved_id,id,reserved_date,capacity,end_of_reservation,reserved){
        this.id=id;
        this.reserved_id=reserved_id;
        
        this.capacity=capacity;
        this.end_of_reservation=end_of_reservation;
        this.reserved_date=reserved_date;
        this.reserved=reserved;
    }
}
module.exports=room