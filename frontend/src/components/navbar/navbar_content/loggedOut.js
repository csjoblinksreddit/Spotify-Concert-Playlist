import React from 'react';

import 'antd/dist/antd.css';
import { Menu } from 'antd';
import { QuestionOutlined, GithubOutlined, HomeOutlined, UserOutlined, LoginOutlined, PlusOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import '../navbar.css' 

import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import homePage from '../../home'
import playlistPage from '../../normal-playlist/playlist'
import userPage from '../../user.js'
import aboutUsPage from '../../aboutUs'

const { SubMenu } = Menu;

class LoggedOutBar extends React.Component {
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
                        <Menu.Item key="aboutUs" icon={<QuestionOutlined />}>
                            <a href="/aboutUs">About Us</a>
                        </Menu.Item>
                        <Menu.Item key="github" icon={<GithubOutlined />}>
                            <a href="https://github.com/csjoblinksreddit/playlistapplication">Github</a>
                        </Menu.Item>
                        <Menu.Item id="login" key="login" icon={<LoginOutlined />}>
                            <a href="http://localhost:8888">Log In</a>
                        </Menu.Item>
                    </Menu>
                </div>
                <Switch>
                    <Route exact path = '/' component = {homePage} />
                    <Route exact path = '/playlist' component = {playlistPage} />
                    <Route exact path = '/user' component = {userPage} />
                    <Route exact path = '/aboutUs' component = {aboutUsPage} />
                </Switch>
            </Router>
        );
    }
}

export default LoggedOutBar