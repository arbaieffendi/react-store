import React from 'react';
import {getJwt} from '../helpers/JWTHelper';
import {getDateNow} from '../helpers/DateHelper';
import {withRouter} from 'react-router-dom';
import axios from 'axios';

class Auth extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            user: undefined
        }
    }

    componentDidMount(){
        // if jwt is set and not expired yet, then authenticate else redirect to login
        const jwt = getJwt();
        console.log(jwt);
        if (!jwt) {
            console.log(`[${getDateNow()}] no JWT`);
            this.setState({
                user: null
            });
            return;
        }

        // if jwt is set and not expired yet, getUser
        axios.get('/auth/getUser', { headers: { Authorization: `Bearer ${jwt}` } }).then(res => this.setState({
            user: res.data
        })).catch(err => {
            console.log(err);
        });
    }
 
    render(){
        const {user} = this.state;
        
        if (user === undefined || user === null){
            this.props.history.push('/login');
        }

        return this.props.children;
    }
}

export default withRouter(Auth);