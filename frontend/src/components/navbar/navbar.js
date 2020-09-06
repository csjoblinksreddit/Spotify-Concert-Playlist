import React from 'react';
import Axios from 'axios';
import 'antd/dist/antd.css';
import './navbar.scss' 
import LoggedOutBar from './navbar_content/loggedOut';
import LoggedInBar from './navbar_content/loggedIn';
import MobileLoggedOutBar from './navbar_content/mobileLoggedOut';
import MobileLoggedInBar from './navbar_content/mobileLoggedIn';
import SpotifyWebApi from 'spotify-web-api-js';
import { checkIfRefreshTokenWorking, checkIfTokenActive, generateNewAccessToken, removeTokens } from '../../scripts/handleTokens';
import { decode, encode } from '../../scripts/encoder';
import isMobile from '../../scripts/isMobile';


const spotifyApi = new SpotifyWebApi();

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            mobile: false
        };
    }

    getMostSearchedArtists = async() => {
        await Axios.get(`http://localhost:8888/get_artists`)
        .then((res) => {
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    
    }

    componentDidMount() {
        let key = localStorage.getItem('key');
        let refresh_token = localStorage.getItem('refresh_token');
        let access_token = decode(localStorage.getItem('access_token'), key);

        this.getMostSearchedArtists();


        if(isMobile()) {
            this.setState({
                mobile: true
            })
        }
        else {
            this.setState({
                mobile: false
            })
        }

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
        if(this.state.mobile) {
            return (
                <div>
                    {this.state.isLoggedIn === true ? <MobileLoggedInBar /> : <MobileLoggedOutBar />}
                </div>
            )
        }
        else {
            return (
                <div>
                    {this.state.isLoggedIn === true ? <LoggedInBar /> : <LoggedOutBar />}
                </div>
            )
        }
    }
}

export default NavBar