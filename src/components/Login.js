import React from 'react';
import { ReactComponent as Logo } from '../assets/logo.svg';
import { withRouter } from 'react-router-dom';
import md5 from 'md5';
import '../App.css';
import validateInput from '../validations/login';
import axios from 'axios';
import {getJwt, clearLocalStorage, getUser} from '../helpers/LocalStorageHelper'

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
      isLoading: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount(){
    let jwt = getJwt();
    let user = getUser();
    if(jwt && user){
      this.props.history.push('/Products');
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  isValid(){
    const {errors, isValid} = validateInput(this.state);

    if (!isValid){
      this.setState({errors});
    }
    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    const passwordMD5 = md5(this.state.password); // what ? MD5 ?! might be bcypt would be better next-time :D

    axios.post('/auth', {
      email: this.state.email,
      password: passwordMD5
    }).then( res => {
        const jwt = res.data.token;
        localStorage.setItem('jwt', jwt);
        this.getUser(jwt);
    });
    this.props.history.push('/Products');
  }

  getUser(jwt){
        fetch('/auth/getUser', {
          method: 'POST',
          headers: { Authorization: `Bearer ${jwt}` } },
          ).then((response) => {
              response.json().then((data) => {
              console.log(data.authData.user);
              localStorage.setItem('user', JSON.stringify(data.authData.user));
              this.setState({
                  user: data.authData.user
              })
          }).catch((error) => {
              console.log(error);
              clearLocalStorage();
              // window.location.reload();
          })
      }) 
      }

  render() {
    const {email, password, errors, isLoading} = this.state;

    return (
      <div className="wrapper fadeInDown" style={{margin:0}}>
        <div id="formContent">
          <div className="fadeIn first">
            <Logo style={{maxHeight: 100}}/> <h2>Simple Store</h2>
          </div>

          <form onSubmit={this.onSubmit}>            
            <input className="fadeIn second" type="text"
              name="email"
              placeholder="Email Address"
              onChange={this.onChange}
              value={email}
              error={errors.email}
            />
            <input className="fadeIn third" type="password"
              name="password"
              placeholder="Password"
              onChange={this.onChange}
              value={password}
              error={errors.password}
            />
            <input type="submit" className="fadeIn fourth" value="Log In" disabled={isLoading}/>
          </form>

          <div id="formFooter">
            <a className="underlineHover" href="#ForgotPassword">Forgot Password?</a>
          </div>

        </div>
      </div>
    );

  }

}

export default withRouter(Login);