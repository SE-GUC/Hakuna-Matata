// The Courserequest model 
class Courserequest {
    constructor(id,description,dateofsubmission,applyingmember_id,categories,recomendations,active) {
        this.id=id;
        this.description=description;
        this.dateofsubmission=dateofsubmission;
        this.applyingmember_id=applyingmember_id;
        this.categories=categories;
        this.recomendations=recomendations;
        this.active=active;
      
       
    };
}

module.exports = Courserequest

