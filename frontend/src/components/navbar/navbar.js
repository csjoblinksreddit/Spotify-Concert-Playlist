import React from 'react';
import 'antd/dist/antd.css';
import './navbar.css' 
import LoggedOutBar from './navbar_content/loggedOut';
import LoggedInBar from './navbar_content/loggedIn';
import SpotifyWebApi from 'spotify-web-api-js';
import { checkIfRefreshTokenWorking, checkIfTokenActive, generateNewAccessToken, removeTokens } from '../../scripts/handleTokens';
import { decode, encode } from '../../scripts/encoder';
import generateRandomString from '../../scripts/randomString';


const spotifyApi = new SpotifyWebApi();

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        };
    }

    componentDidMount() {
        let key = localStorage.getItem('key');
        let refresh_token = localStorage.getItem('refresh_token');
        let access_token = decode(localStorage.getItem('access_token'), key);

        if(refresh_token) { // if we have refresh token
            checkIfRefreshTokenWorking(refresh_token)
            .then(res => {
                this.setState({
                    isLoggedIn: res
                })
            })
            .catch(err => console.log(err))

            checkIfTokenActive(access_token, spotifyApi)
            .catch(err => { // if access token not active generate new one
                generateNewAccessToken(refresh_token)
            })
        }
        else { // if we don't have refresh token
            removeTokens() // login again
        }
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