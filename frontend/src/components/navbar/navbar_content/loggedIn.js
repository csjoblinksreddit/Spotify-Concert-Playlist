import React from 'react';

import 'antd/dist/antd.css';
import { Menu } from 'antd';
import { QuestionOutlined, GithubOutlined, HomeOutlined, UserOutlined, LogoutOutlined, PlusOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import '../navbar.css' 

import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import homePage from '../../home'
import playlistPage from '../../normal-playlist/playlist'
import userPage from '../../user.js'
import aboutUsPage from '../../aboutUs'
import ConcertPlaylist from '../../concertPlaylist';
import Concert from '../../concert'


const { SubMenu } = Menu;

class LoggedInBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'mail',
        };
    }

    handleClick = e => {
        this.setState({ current: e.key });
    };

    render() {
        const { current } = this.state;
        return (
            <Router>
                <div className="navbarContainer">
                    <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
                        <Menu.Item id="home" key="home" icon={<HomeOutlined />}>
                            <a href="/">Playlist Creator</a>
                        </Menu.Item>
                        <Menu.Item key="user" icon={<UserOutlined />}>
                            <a href="/user">User</a>
                        </Menu.Item>
                        <SubMenu id="dropDown" icon={<AppstoreAddOutlined />} title="Create Playlist">
                            <Menu.Item key="concert" icon={<PlusOutlined />}>
                                <a href="/concertPlaylist">Concert Playlist</a>
                            </Menu.Item>
                            <Menu.Item key="normal" icon={<PlusOutlined />}>
                                <a href="/playlist">Normal Playlist</a>
                            </Menu.Item>
                        </SubMenu>
                        <Menu.Item key="aboutUs" icon={<QuestionOutlined />}>
                            <a href="/aboutUs">About Us</a>
                        </Menu.Item>
                        <Menu.Item key="github" icon={<GithubOutlined />}>
                            <a href="https://github.com/csjoblinksreddit/playlistapplication">Github</a>
                        </Menu.Item>
                        <Menu.Item id="login" key="login" icon={<LogoutOutlined />}>
                            <a
                                href='/' 
                                onClick={() => {
                                    localStorage.removeItem('key')
                                    localStorage.removeItem('access_token')
                                    localStorage.removeItem('refresh_token')
                                }} 
                            >
                                Log Out
                            </a>
                        </Menu.Item>
                    </Menu>
                </div>
                <Switch>
                    <Route exact path = '/' component = {homePage} />
                    <Route exact path = '/playlist' component = {playlistPage} />
                    <Route exact path = '/concertPlaylist' component = {ConcertPlaylist}/>
                    <Route exact path = '/concert' component={Concert}/>
                    <Route exact path = '/user' component = {userPage} />
                    <Route exact path = '/aboutUs' component = {aboutUsPage} />
                </Switch>
            </Router>
        );
    }
}

export default LoggedInBar