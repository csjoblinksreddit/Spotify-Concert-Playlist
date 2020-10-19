import React from "react";

import "antd/dist/antd.css";
import { Menu } from "antd";
import {
  GithubOutlined,
  HomeOutlined,
  LogoutOutlined,
  PlusOutlined,
  AppstoreAddOutlined,
  BarChartOutlined
} from "@ant-design/icons";
import "../navbar.scss";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


import ConcertPlaylist from '../../concert-playlist/concertPlaylist';
import Concert from '../../concert-playlist/concert'

import homePage from "../../home";
import playlistPage from "../../normal-playlist/playlist";
import Statistics from "../../statistics/statistics";


const { SubMenu } = Menu;

class LoggedInBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: "mail",
    };
  }

  handleClick = (e) => {
    this.setState({ current: e.key });
  };

  render() {
    const { current } = this.state;
    return (
      <Router>
        <div className="navbarContainer">
          <Menu
            onClick={this.handleClick}
            selectedKeys={[current]}
            mode="horizontal"
          >
            <Menu.Item id="home" key="home" icon={<HomeOutlined />}>
              <a href="/">Playlist App</a>
            </Menu.Item>
            <SubMenu
              id="dropDown"
              icon={<AppstoreAddOutlined />}
              title="Create Playlist"
            >
              <Menu.Item key="concert" icon={<PlusOutlined />}>
                <a href="/concertPlaylist">Concert Playlist</a>
              </Menu.Item>
              <Menu.Item key="normal" icon={<PlusOutlined />}>
                <a href="/playlist">Normal Playlist</a>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="statistics" icon={<BarChartOutlined />}>
              <a href="/statistics">Statistics</a>
            </Menu.Item>
            <Menu.Item key="github" icon={<GithubOutlined />}>
              <a href="https://github.com/csjoblinksreddit/playlistapplication">
                Github
              </a>
            </Menu.Item>
            <Menu.Item id="login" key="login" icon={<LogoutOutlined />}>
              <a
                href="/"
                onClick={() => {
                  localStorage.removeItem("key");
                  localStorage.removeItem("access_token");
                  localStorage.removeItem("refresh_token");
                }}
              >
                Log Out
              </a>
            </Menu.Item>
          </Menu>
        </div>
        <Switch>
          <Route exact path="/" component={homePage} />
          <Route exact path="/playlist" component={playlistPage} />
          <Route exact path="/statistics" component={Statistics} />
          <Route exact path = '/concertPlaylist' component = {ConcertPlaylist}/>
          <Route exact path = '/concert' component={Concert}/>
        </Switch>
      </Router>
    );
  }
}

export default LoggedInBar;
