import axios from 'axios';
import {GET_ERRORS, SET_MasterClasses,SET_Skills} from './types'
import jwt_decode from 'jwt-decode';


//LOG IN GET THE TOKEN  
export const setSkills = () => dispatch =>{
    axios.get('http://localhost:3333/skills')
    .then(res => {
        console.log(res)
        //now save the token to a local storage
     const skills = res.data.data ;   
     //now setting the token to local storage 
     localStorage.setItem('skills',skills);
     dispatch(setCurrentSkills(skills));
     
     
    })
    .catch(err=>
        dispatch({
            type:GET_ERRORS,
            payload:err
    })
    );
};
export const setMasterClasses = () => dispatch =>{
    axios.get('http://localhost:3333/masterClasses')
    .then(res => {
        console.log(res)

        //now save the token to a local storage
     const masterClasses = res.data.data ;   
     //now setting the token to local storage 

     localStorage.setItem('masterClasses',masterClasses);
     dispatch(setCurrentMasterClasses(masterClasses));


     
    })
    .catch(err=>
        dispatch({
            type:GET_ERRORS,
            payload:err
    })
    );
};

//SET LOGGED IN USER 
export const setCurrentMasterClasses = ( masterClasses )=>{

    return {
        type:SET_MasterClasses,
        payload:masterClasses
    }
}
export const setCurrentSkills = ( skills )=>{
    console.log('here')
    return {
        type:SET_Skills,
        payload:skills
    }
}
