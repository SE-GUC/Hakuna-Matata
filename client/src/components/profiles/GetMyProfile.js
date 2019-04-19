import React, { Component } from "react";
import axios from "axios";
import CoworkingSpace from './getSpec'
import EducationalOrganiztion from './GetSpecificEdu'
import ConsultancyAgency from './GetSpecificAgency'
import Partner from './PartnerAsPartner'
import Member from './Member'

var store = require('store')
export class GetMyProfile extends Component {
  
        
    
    getData(){
      if(store.get('payload').tags[0] =='Partner'){
     
      return <Partner id ={store.get('payload').id}></Partner>
    }else   if(store.get('payload').tags[0] =='Member'){
      return <Member id ={store.get('payload').id}></Member>
    }else   if(store.get('payload').tags[0] =='ConsultancyAgency'){
return <ConsultancyAgency id ={store.get('payload').id}></ConsultancyAgency>
    }else   if(store.get('payload').tags[0] =='CoworkingSpace'){
        return <CoworkingSpace id ={store.get('payload').id}></CoworkingSpace>
    }
else if(store.get('payload').tags[0] =='EducationOrganization'){
    return <EducationalOrganiztion id ={store.get('payload').id}></EducationalOrganiztion>
}
console.log(store.get('payload').tags)
}

    

    render() {
      return (<div>
        {this.getData()}
        </div>
      );
    }
  
}
    
  export default GetMyProfile;