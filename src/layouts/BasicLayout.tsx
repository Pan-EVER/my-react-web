import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Outlet, history, useAppData } from "umi";

const { Header, Content, Sider } = Layout;

const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2: MenuProps["items"] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,

    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

const BasicLayout: React.FC = () => {
  const appData = useAppData();
  const { clientRoutes } = appData;
  console.log("appData", appData);
  // 业务页面路由
  const allbusinessRoutes = clientRoutes[0]?.routes?.[0]?.routes || [];
  console.log("allbusinessRoutes", allbusinessRoutes);
  // 侧栏菜单
  const getSiderMenuItems = (routes) => {
    return routes.map((item) => {
      const { id, name, path, routes: subRoutes } = item;
      if (Array.isArray(subRoutes) && subRoutes.length > 0) {
        return {
          key: `${path}`,
          label: `${name}`,
          // icon: React.createElement(icon),
          children: getSiderMenuItems(subRoutes),
        };
      }

      return {
        key: `${path}`,
        label: `${name}`,
      };
    });
  };
  const siderMenuItems = getSiderMenuItems(allbusinessRoutes);
  console.log("siderMenuItems", siderMenuItems);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items1}
        />
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
            items={siderMenuItems}
            onClick={({ key }) => {
              history.push({ pathname: key });
            }}
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
