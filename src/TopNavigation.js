import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  MessageOutlined,
  MailOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

const TopNavigation = () => (
  <Menu mode="horizontal">
    <Menu.Item key="home" icon={<HomeOutlined />}>
      <Link to="/">Hjem</Link>
    </Menu.Item>
    <Menu.Item key="contact" icon={<MailOutlined />}>
      <Link to="/contact">Kontakt</Link>
    </Menu.Item>
    {/* More menu items here */}
  </Menu>
);

export default TopNavigation;
