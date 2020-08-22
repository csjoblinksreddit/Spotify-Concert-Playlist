import React from 'react';
import 'antd/dist/antd.css';
import './navbar.css' 
import LoggedOutBar from './navbar_content/loggedOut';
import LoggedInBar from './navbar_content/loggedIn';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        };
    }

    componentDidMount() {
        if(localStorage.getItem('refresh_token')) {
            this.setState({
                isLoggedIn: true
            })
        }
        console.log(this.state.isLoggedIn)
    }

    render() {
        const { isLoggedIn } = this.state;
        return (
            <div>
                {isLoggedIn === true ? <LoggedInBar /> : <LoggedOutBar />}
            </div>
        );
    }
}

export default NavBar