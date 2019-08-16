import React from 'react';
import {getJwt, getUser} from '../helpers/LocalStorageHelper';
import {getDateNow} from '../helpers/DateHelper';
import {withRouter} from 'react-router-dom';

class Auth extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            user: undefined
        }
    }

    componentWillMount(){
        // if jwt is set and not expired yet, then allow pass else redirect to login
        const jwt = getJwt();
        if (!jwt) {
            return console.log(`[${getDateNow()}] no JWT`);

        }else {
            this.setState({
                user: JSON.parse(getUser())
            });
        }
    }
 
    render(){
        const {user} = this.state;
        
        if (user === undefined || user === null){
            console.log('here');
            console.log(user);
            this.props.history.push('/login');
        }

        return this.props.children;
    }
}

export default withRouter(Auth);