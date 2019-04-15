import React, { Component } from 'react';

import EducationalOrganizations from '../profileComponents/EducationalOrganizations';
import axios from 'axios';

export class GetAllEdu extends Component{
state={
    educationalOrganizations:[]
}
componentDidMount(){
    axios.get(`http://localhost:3333/educationalOrganizations/`).then(res=>{
        //console.log(res);
        this.setState({educationalOrganizations: res.data.data})
        console.log(res.data.data)
  })
}
render(){
    return(
        <div className='getAllEdu'>
        <EducationalOrganizations educationalOrganizations={this.state.educationalOrganizations}
        />
        </div>
    )
}
}
export default GetAllEdu