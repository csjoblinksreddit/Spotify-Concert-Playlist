import React from 'react';
import 'antd/dist/antd.css';
import './navbar.css' 
import LoggedOutBar from './navbar_content/loggedOut';
import LoggedInBar from './navbar_content/loggedIn';
import checkIfRefreshTokenWorking from '../../scripts/checkRefreshToken';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        };
    }

    componentDidMount() {
        let refresh_token = localStorage.getItem('refresh_token');
        if(refresh_token) {
            let isActive = this.checkIfRefreshTokenWorking(refresh_token)
            .then(res => {
                this.setState({
                    isLoggedIn: res
                })
            })
            .catch(err => console.log(err))
        }

        else {
            localStorage.removeItem('refresh_token')
        }
    }

    checkIfRefreshTokenWorking = (refresh_token) => new Promise((resolve, reject) => {
        fetch('http://localhost:8888/refresh_token?refresh_token='+refresh_token)
        .then(response => {
          resolve(true)
        })
        .catch(err => {
          reject(false)
        })
    })
    

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