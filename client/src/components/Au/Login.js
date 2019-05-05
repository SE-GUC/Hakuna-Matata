 import React, { Component } from 'react'
 import PropTypes from 'prop-types';
 import { connect } from 'react-redux'
 import classnames from 'classnames'
 import { setSkills,setMasterClasses } from '../../globalStore/actions/getInfoActions'
 import { loginUser } from '../../globalStore/actions/authActions'

 class Login extends Component {
    constructor(){
        super();
        this.state={
            
            email:'',
            password:'',
           
            errors:{}
        }
    }
    onChange = (e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    
    componentDidMount(){
      if(this.props.auth.isAuthenticated){
        //  this.props.history.push('./HomePage');
      }
    }
    

    componentWillReceiveProps(nexProps){
      console.log('A')
      if(nexProps.auth.isAuthenticated){
        if(nexProps.auth.user.emailVerified){
          console.log(nexProps.auth.user.tags.length)
          if( nexProps.auth.user.tags.length==0) window.location.href="http://localhost:3000/startAs"
          else{
            if( nexProps.auth.user.tags.length>0) window.location.href="http://localhost:3000/HomePage"
      }
      }
       else  window.location.href="http://localhost:3000/verificationpage"
      }
      if(nexProps.errors){
        this.setState({errors:nexProps.errors})
      }
    }

    onSubmit = (e)=>{
        e.preventDefault();
        const userData = {
            
            email:this.state.email,
            password:this.state.password

        }

       this.props.loginUser(userData)
       this.props.setSkills()
       this.props.setMasterClasses()
       console.log('here')

      //  this.props.history.push('/Homepage');

      }
   render() {
     const {errors} =this.state;
     return (
      
        <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 style ={color} className="display-4 text-center">Log In</h1>
              <p  style ={color} className="lead text-center">Sign in to your  account</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">


                  <input 
                  type="email" className={classnames('form-control form-control-lg',{'is-invalid':errors.email
                })} placeholder="Email Address" name="email" value={this.state.email}
                    onChange={this.onChange} style={{background:'transparent'}}
                     />
                     {errors.email &&(<div className="invalid-feedback">{errors.email}</div>)}



                </div>
                <div className="form-group">


                  <input type="password" className={classnames('form-control form-control-lg',{'is-invalid':errors.password
              })} placeholder="Password" name="password" value={this.state.password}
                    onChange={this.onChange} style={{background:'transparent'}}
                     />
                     {errors.password &&(<div className="invalid-feedback">{errors.password}</div>)}


                </div>
                <input type="submit" className="btn btn-lg btn-light" value ="LOGIN"/>
              </form>
            </div>
          </div>
        </div>
      </div>
      
     )
   }
 }

//  Login.propTypes = {
//    loginUser:PropTypes.func.isRequired,
//    auth:PropTypes.object.isRequired,
//    errors:PropTypes.string.isRequired
//  }

 const color={
  color: "white"
}


 const mapStateToProps =(state)=>({
   auth:state.auth,
   errors:state.errors,
   info:state.info
 })
 
 export default connect(mapStateToProps,{loginUser,setMasterClasses,setSkills})(Login);