import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
// import axios from 'axios';
import classnames from 'classnames';
import { connect } from 'react-redux';
import {registerUser} from '../../globalStore/actions/authActions'
class Register extends Component {
    constructor(){
        super();
        this.state={
       
          
          email:'',
          password:'',
          password2:'',
          errors:{}
        }
    }

    componentDidMount(){
      if(this.props.auth.isAuthenticated){
         this.props.history.push('./verificationpage');
      }
    }

      componentWillReceiveProps(nextProps){
        if(this.props.auth.isAuthenticated){
          this.props.history.push('./verificationpage');
       }
        if(nextProps.errors){
          this.setState({errors:nextProps.errors})
        }
      }

     onChange = (e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    onSubmit = (e)=>{
        e.preventDefault();
        const newUser = {
          
          displayedName: 'abdoh',
          email:this.state.email,
          password:this.state.password,
          // password2:this.state.password2,

        }
        this.props.registerUser(newUser,this.props.history);
        
    }
  render() {

    const { errors } = this.state;
    
    return (
        <div className="register">
        
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Sign Up</h1>
          <p className="lead text-center">Create your  account</p>

          <form noValidate onSubmit={this.onSubmit}>

     <div className="form-group">
                  <input type="email" className={classnames('form-control form-control-lg',{'is-invalid':errors.email
                  })} placeholder="Email Address" name="email" value={this.state.email} 
                  onChange={this.onChange}
                  />
                  {/* {errors.email &&(<div className="invalid-feedback">{errors.email}</div>)} */}
                  <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
              </div>



              <div className="form-group">
                  <input type="password" className={classnames('form-control form-control-lg',{'is-invalid':errors.password
                  })} placeholder="Password" name="password" value={this.state.password}
                  onChange={this.onChange}
                  />
                  {/* {errors.password &&(<div className="invalid-feedback">{errors.password}</div>)} */}
              </div>


            
              
              <div className="form-group">
                  <input type="password" className={classnames('form-control form-control-lg',{'is-invalid':errors.password2
                  })} placeholder="Confirm Password" name="password2" value={this.state.password2}
                  onChange={this.onChange}
                  />
                  {/* {errors.password2 &&(<div className="invalid-feedback">{errors.password2}</div>)} */}
               </div>
          <input type="submit" className="btn btn-lg btn-light" value ="SIGNUP" />
          </form>
        </div>
      </div>
    </div>
  </div>
    )
  }
}
// Register.propTypes = {
//   registerUser:PropTypes.func.isRequired,
//   auth:PropTypes.object.isRequired
//   // errors:PropTypes.object.isRequired
// }

const mapStateToProps = (state)=>({
  auth:state.auth,
  errors:state.errors

});


export default connect(mapStateToProps,{registerUser})(withRouter(Register));



//////////////////////// staaaaaaaaaaart 














