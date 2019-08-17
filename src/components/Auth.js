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
        const jwt = getJwt();
        if (!jwt) {
            return console.log(`[${getDateNow()}] no JWT`);
        }else {
            this.setState({
                user: JSON.parse(getUser())
            });
        }
    }
 
    // render(){
    //     const {user} = this.state;
        
    //     console.log(this.state);
        
    //     if (user === undefined || user === null){
    //         console.log('here');
    //         console.log(user);
    //         this.props.history.push('/login');
    //         return;
    //     }

    //     return this.props.children;
    // }

    render(){
        const children = React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {
              user: this.state.user
            });
          });

          return children;
    }
}

export default withRouter(Auth);