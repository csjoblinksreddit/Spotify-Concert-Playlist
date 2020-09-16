import React from "react";

import "antd/dist/antd.css";
import { Menu } from "antd";
import {
  QuestionOutlined,
  GithubOutlined,
  HomeOutlined,
  LoginOutlined,
  BarChartOutlined
} from "@ant-design/icons";
import "../navbar.scss";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import homePage from "../../home";
import playlistPage from "../../normal-playlist/playlist";
import userPage from "../../user.js";
import aboutUsPage from "../../aboutUs";
import Statistics from "../../statistics/statistics";

const { SubMenu } = Menu;

class LoggedOutBar extends React.Component {
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
            <Menu.Item key="statistics" icon={<BarChartOutlined />}>
              <a href="/statistics">Statistics</a>
            </Menu.Item>
            <Menu.Item key="aboutUs" icon={<QuestionOutlined />}>
              <a href="/aboutUs">About Us</a>
            </Menu.Item>
            <Menu.Item key="github" icon={<GithubOutlined />}>
              <a href="https://github.com/csjoblinksreddit/playlistapplication">
                Github
              </a>
            </Menu.Item>
            <Menu.Item id="login" key="login" icon={<LoginOutlined />}>
              <a href="http://localhost:8888">Log In</a>
            </Menu.Item>
          </Menu>
        </div>
        <Switch>
          <Route exact path="/" component={homePage} />
          <Route exact path="/playlist" component={playlistPage} />
          <Route exact path="/user" component={userPage} />
          <Route exact path="/aboutUs" component={aboutUsPage} />
          <Route exact path="/statistics" component={Statistics} />
        </Switch>
      </Router>
    );
  }
}

export default LoggedOutBar;
